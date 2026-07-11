#!/usr/bin/env python3
"""ppt제작-1 대화 기록 JSONL → PDF 추출"""

import html
import json
import re
import subprocess
from datetime import datetime
from pathlib import Path

TRANSCRIPT = Path(
    "/Users/youjin/.cursor/projects/Users-youjin-Desktop/agent-transcripts/"
    "b126ad56-3b82-4c47-838d-1a2758757560/b126ad56-3b82-4c47-838d-1a2758757560.jsonl"
)
OUTPUT_PDF = Path(__file__).resolve().parent.parent / "docs" / "리봄-ppt제작-1-대화기록.pdf"
OUTPUT_MD = Path(__file__).resolve().parent.parent / "docs" / "리봄-ppt제작-1-대화기록.md"
OUTPUT_HTML = Path(__file__).resolve().parent.parent / "docs" / "리봄-ppt제작-1-대화기록.html"
CHROME = Path("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")


def clean_user_text(text: str) -> str:
    text = re.sub(r"</?user_query>", "", text)
    return text.strip()


def extract_text_parts(content: list) -> str:
    parts = []
    for item in content:
        if item.get("type") != "text":
            continue
        text = item.get("text", "")
        if not text or text.strip() == "[REDACTED]":
            continue
        parts.append(text)
    return "\n\n".join(parts).strip()


def parse_transcript(path: Path) -> list[tuple[str, str]]:
    turns: list[tuple[str, str]] = []
    if not path.exists():
        raise FileNotFoundError(f"대화 기록 없음: {path}")

    with path.open(encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                obj = json.loads(line)
            except json.JSONDecodeError:
                continue

            role = obj.get("role")
            message = obj.get("message") or {}
            content = message.get("content") or []
            if not isinstance(content, list):
                continue

            text = extract_text_parts(content)
            if not text:
                continue

            if role == "user":
                text = clean_user_text(text)
                if text:
                    turns.append(("user", text))
            elif role == "assistant":
                turns.append(("assistant", text))

    return turns


def write_markdown(turns: list[tuple[str, str]], path: Path) -> None:
    lines = [
        "# 리봄 ppt제작-1 대화 기록",
        "",
        f"추출일: {datetime.now().strftime('%Y-%m-%d %H:%M')}",
        "",
        "---",
        "",
    ]
    n = 0
    for role, text in turns:
        if role == "user":
            n += 1
            lines.append(f"## [{n}] 사용자")
        else:
            lines.append(f"## [{n}] AI")
        lines.append("")
        lines.append(text)
        lines.append("")
        lines.append("---")
        lines.append("")

    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(lines), encoding="utf-8")


def text_to_html_body(text: str) -> str:
    """간단한 마크다운 스타일을 HTML로 변환"""
    escaped = html.escape(text)
    # 코드블록
    escaped = re.sub(
        r"```([\s\S]*?)```",
        lambda m: f'<pre><code>{m.group(1).strip()}</code></pre>',
        escaped,
    )
    # 굵게
    escaped = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", escaped)
    # 헤더
    escaped = re.sub(r"^### (.+)$", r"<h3>\1</h3>", escaped, flags=re.MULTILINE)
    escaped = re.sub(r"^## (.+)$", r"<h2>\1</h2>", escaped, flags=re.MULTILINE)
    escaped = re.sub(r"^# (.+)$", r"<h1>\1</h1>", escaped, flags=re.MULTILINE)
    # 단락
    blocks = escaped.split("\n\n")
    html_blocks = []
    for block in blocks:
        block = block.strip()
        if not block:
            continue
        if block.startswith("<h") or block.startswith("<pre"):
            html_blocks.append(block)
        else:
            block = block.replace("\n", "<br>")
            html_blocks.append(f"<p>{block}</p>")
    return "\n".join(html_blocks)


def write_html(turns: list[tuple[str, str]], path: Path) -> None:
    user_count = sum(1 for r, _ in turns if r == "user")
    assistant_count = sum(1 for r, _ in turns if r == "assistant")
    now = datetime.now().strftime("%Y-%m-%d %H:%M")

    sections = []
    n = 0
    for role, text in turns:
        if role == "user":
            n += 1
            label = f"[{n}] 사용자"
            css_class = "user"
        else:
            label = f"[{n}] AI"
            css_class = "assistant"
        body = text_to_html_body(text)
        sections.append(
            f'<section class="turn {css_class}">'
            f'<h2 class="turn-label">{html.escape(label)}</h2>'
            f'<div class="turn-body">{body}</div>'
            f"</section>"
        )

    doc = f"""<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>리봄 ppt제작-1 대화 기록</title>
<style>
  @page {{ margin: 18mm 16mm; }}
  body {{
    font-family: "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
    font-size: 11pt;
    line-height: 1.55;
    color: #222;
    max-width: 780px;
    margin: 0 auto;
    padding: 24px;
  }}
  .cover {{
    text-align: center;
    padding: 48px 0 32px;
    border-bottom: 2px solid #1a473a;
    margin-bottom: 32px;
  }}
  .cover h1 {{ color: #1a473a; font-size: 28pt; margin: 0 0 8px; }}
  .cover .sub {{ color: #555; font-size: 12pt; }}
  .meta {{ color: #777; font-size: 10pt; margin-top: 12px; }}
  .turn {{ page-break-inside: avoid; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px solid #e8e8e8; }}
  .turn-label {{
    font-size: 13pt;
    margin: 0 0 10px;
    padding: 6px 10px;
    border-radius: 6px;
    display: inline-block;
  }}
  .user .turn-label {{ background: #e8f3ef; color: #1a473a; }}
  .assistant .turn-label {{ background: #f0f4f8; color: #2a6b55; }}
  .turn-body h1, .turn-body h2, .turn-body h3 {{ color: #1a473a; margin-top: 16px; }}
  .turn-body pre {{
    background: #f6f8fa;
    border: 1px solid #e1e4e8;
    border-radius: 6px;
    padding: 12px;
    font-size: 9pt;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-word;
  }}
  .turn-body table {{ border-collapse: collapse; width: 100%; font-size: 10pt; margin: 8px 0; }}
  .turn-body th, .turn-body td {{ border: 1px solid #ddd; padding: 6px 8px; text-align: left; }}
  .turn-body th {{ background: #f5f5f5; }}
</style>
</head>
<body>
  <div class="cover">
    <h1>리봄 ppt제작-1</h1>
    <div class="sub">대화 기록 전체</div>
    <div class="meta">추출일: {now}<br>총 {user_count}개 질문 · {assistant_count}개 답변</div>
  </div>
  {"".join(sections)}
</body>
</html>"""

    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(doc, encoding="utf-8")


def html_to_pdf(html_path: Path, pdf_path: Path) -> None:
    if not CHROME.exists():
        raise RuntimeError(
            "Chrome이 없어 PDF 변환을 할 수 없습니다. "
            f"대신 {html_path} 또는 {OUTPUT_MD} 파일을 브라우저에서 PDF로 저장하세요."
        )

    cmd = [
        str(CHROME),
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        f"--print-to-pdf={pdf_path}",
        f"file://{html_path.resolve()}",
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    if result.returncode != 0 or not pdf_path.exists():
        raise RuntimeError(
            f"PDF 변환 실패\nstdout: {result.stdout}\nstderr: {result.stderr}"
        )


def main():
    turns = parse_transcript(TRANSCRIPT)
    if not turns:
        raise SystemExit("추출할 대화 내용이 없습니다.")

    write_markdown(turns, OUTPUT_MD)
    write_html(turns, OUTPUT_HTML)
    html_to_pdf(OUTPUT_HTML, OUTPUT_PDF)

    print(f"Markdown: {OUTPUT_MD}")
    print(f"HTML:     {OUTPUT_HTML}")
    print(f"PDF:      {OUTPUT_PDF}")
    print(
        f"턴 수: user={sum(1 for r, _ in turns if r == 'user')}, "
        f"assistant={sum(1 for r, _ in turns if r == 'assistant')}"
    )


if __name__ == "__main__":
    main()

"""Generate the portfolio's static images: OG card, app icons, and a résumé placeholder.

Run from the project root:
    python scripts/generate-assets.py
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
PUBLIC.mkdir(exist_ok=True)

FONT_BOLD = "C:/Windows/Fonts/segoeuib.ttf"
FONT_REGULAR = "C:/Windows/Fonts/segoeui.ttf"
FONT_MONO = "C:/Windows/Fonts/consola.ttf"
FONT_MONO_BOLD = "C:/Windows/Fonts/consolab.ttf"

BG = (7, 11, 16)
INK = (233, 240, 247)
MUTED = (153, 168, 184)
CYAN = (54, 188, 247)
VIOLET = (167, 139, 250)


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def gradient_layer(size, top_left, bottom_right, alpha=255):
    """A soft diagonal two-colour gradient used for the glow."""
    width, height = size
    base = Image.new("RGB", size, top_left)
    draw = ImageDraw.Draw(base)
    for y in range(height):
        mix = y / max(height - 1, 1)
        color = tuple(int(top_left[i] * (1 - mix) + bottom_right[i] * mix) for i in range(3))
        draw.line([(0, y), (width, y)], fill=color)
    base.putalpha(alpha)
    return base


def add_glow(canvas, center, radius, color, opacity=90):
    layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    draw.ellipse(
        [center[0] - radius, center[1] - radius, center[0] + radius, center[1] + radius],
        fill=(*color, opacity),
    )
    layer = layer.filter(ImageFilter.GaussianBlur(radius // 2))
    canvas.alpha_composite(layer)


def draw_grid(canvas, spacing=64, opacity=14):
    layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    for x in range(0, canvas.width, spacing):
        draw.line([(x, 0), (x, canvas.height)], fill=(255, 255, 255, opacity))
    for y in range(0, canvas.height, spacing):
        draw.line([(0, y), (canvas.width, y)], fill=(255, 255, 255, opacity))
    canvas.alpha_composite(layer)


def rounded_icon(size, path):
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle([0, 0, size, size], radius=int(size * 0.24), fill=BG)
    add_glow(canvas, (size * 0.2, size * 0.1), int(size * 0.75), CYAN, 55)
    add_glow(canvas, (size * 0.9, size * 0.9), int(size * 0.7), VIOLET, 45)

    # Gradient outline
    border = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    bdraw = ImageDraw.Draw(border)
    bdraw.rounded_rectangle(
        [2, 2, size - 2, size - 2],
        radius=int(size * 0.23),
        outline=(54, 188, 247, 150),
        width=max(2, size // 90),
    )
    canvas.alpha_composite(border)

    text = "MR"
    text_font = font(FONT_MONO_BOLD, int(size * 0.36))
    bbox = draw.textbbox((0, 0), text, font=text_font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(
        ((size - tw) / 2 - bbox[0], (size - th) / 2 - bbox[1] - size * 0.01),
        text,
        font=text_font,
        fill=INK,
    )
    dot = max(3, int(size * 0.045))
    draw.ellipse(
        [size * 0.74, size * 0.15, size * 0.74 + dot, size * 0.15 + dot],
        fill=CYAN,
    )
    canvas.save(path)
    print(f"wrote {path}")


def make_og():
    width, height = 1200, 630
    canvas = Image.new("RGBA", (width, height), (*BG, 255))
    add_glow(canvas, (140, 80), 520, CYAN, 85)
    add_glow(canvas, (1090, 610), 560, VIOLET, 75)
    draw_grid(canvas, 60, 12)

    draw = ImageDraw.Draw(canvas)

    # Top label
    draw.ellipse([80, 74, 92, 86], fill=CYAN)
    draw.text((106, 68), "PORTFOLIO / 2026", font=font(FONT_MONO, 20), fill=MUTED)

    # Name
    name_font = font(FONT_BOLD, 88)
    draw.text((76, 148), "Mostafijur", font=name_font, fill=INK)
    draw.text((76, 242), "Rahman", font=name_font, fill=(120, 210, 250))

    # Role / tagline
    draw.text(
        (80, 372),
        "SOFTWARE ENGINEER  ·  PYTHON  ·  WEB  ·  DATABASES",
        font=font(FONT_MONO_BOLD, 21),
        fill=CYAN,
    )
    draw.text(
        (80, 424),
        "Build • Learn • Improve • Share",
        font=font(FONT_REGULAR, 28),
        fill=INK,
    )
    draw.text(
        (80, 474),
        "Practical, user-friendly software — built and refined through real projects.",
        font=font(FONT_REGULAR, 23),
        fill=MUTED,
    )

    # Bottom row
    draw.line([(80, 548), (1120, 548)], fill=(255, 255, 255, 30), width=1)
    draw.text((80, 570), "github.com/mostafijhemal", font=font(FONT_MONO, 20), fill=MUTED)
    draw.text((1120, 570), "DHAKA, BANGLADESH", font=font(FONT_MONO, 20), fill=MUTED, anchor="ra")

    # Accent bar
    draw.rounded_rectangle([80, 112, 200, 117], radius=3, fill=CYAN)

    canvas.convert("RGB").save(PUBLIC / "og-image.png", optimize=True)
    print("wrote public/og-image.png")


def make_resume():
    target = PUBLIC / "resume.pdf"
    if target.exists():
        print("kept existing public/resume.pdf (delete it to regenerate the placeholder)")
        return

    width, height = 1240, 1754  # A4 at 150 dpi
    canvas = Image.new("RGB", (width, height), (250, 250, 248))
    draw = ImageDraw.Draw(canvas)

    # Header band
    draw.rectangle([0, 0, width, 250], fill=BG)
    draw.text((90, 72), "MOSTAFIJUR RAHMAN", font=font(FONT_BOLD, 50), fill=INK)
    draw.text(
        (92, 142),
        "Software Engineer  ·  Dhaka, Bangladesh",
        font=font(FONT_MONO, 22),
        fill=(120, 210, 250),
    )
    draw.text(
        (92, 188),
        "github.com/mostafijhemal  ·  linkedin.com/in/mostafij-hemal  ·  mostafij.hemal@gmail.com",
        font=font(FONT_MONO, 17),
        fill=(180, 196, 212),
    )

    y = 310
    draw.text((90, y), "PLACEHOLDER RÉSUMÉ", font=font(FONT_MONO_BOLD, 18), fill=(180, 90, 30))
    y += 38
    draw.text(
        (90, y),
        "Replace this file with your real résumé (public/resume.pdf).",
        font=font(FONT_REGULAR, 22),
        fill=(60, 70, 80),
    )
    y += 56

    def section(title):
        nonlocal y
        draw.text((90, y), title.upper(), font=font(FONT_MONO_BOLD, 19), fill=(8, 110, 150))
        y += 34
        draw.line([(90, y), (1150, y)], fill=(215, 220, 225), width=1)
        y += 26

    def line(text, size=21, color=(45, 55, 65), mono=False):
        nonlocal y
        draw.text((90, y), text, font=font(FONT_MONO if mono else FONT_REGULAR, size), fill=color)
        y += int(size * 1.7)

    section("Profile")
    line("Software engineer with a B.Sc. and M.Sc. in Computer Science and Engineering. Builds practical,")
    line("user-friendly applications and learns through hands-on projects. Beginner to intermediate,")
    line("growing fast. Interested in Python backend development, databases and software design.")
    y += 18

    section("Experience")
    line("Executive — AristoPharma Ltd., Dhaka, February 2023 – Present", 21)
    line("Software Support Engineer — Living Support, February 2022 – December 2022", 21)
    line("Add 2–3 responsibilities you want to show to complete this section.", 18, (120, 125, 130))
    y += 18

    section("Education")
    line("M.Sc. in Computer Science and Engineering — Jahangirnagar University, 2026", 21)
    line("B.Sc. in Computer Science and Engineering — Eastern University, 2019", 21)
    y += 18

    section("Certifications & training")
    line("AI Fluency: Framework & Foundations — Anthropic", 19)
    line("Gemini Certified Educator — Google for Education, 2025", 19)
    line("SAP ABAP Development Specialist — SDTEKH / SAP S/4HANA, 2026", 19)
    line("Python Essentials 1 & 2 — Cisco Networking Academy / Python Institute, 2026", 19)
    line("Web Development (300 hr) — NextTech IT under LICT, 2018", 19)
    line("Laravel (90 hr) · Web App Development in Python & Django (60 hr) ·", 19)
    line("Software Testing & QA (60 hr) — PeopleNTech", 19)
    y += 18

    section("Selected projects")
    line("Sports IPTV Backend — Python, FastAPI, PostgreSQL", 20)
    line("Advanced Cookies Analyzer — Python, Streamlit, Pandas, SQLite (M.Sc. thesis)", 20)
    line("Web-Based CGPA Calculator — HTML, Tailwind CSS, JavaScript", 20)
    line("BashaRent Manager — Node.js, React, TypeScript", 20)
    y += 18

    section("Skills")
    line("Python · JavaScript · C/C++ · PHP · HTML5 · CSS3 · Tailwind CSS · Bootstrap · React", 19)
    line("Flask · Django · Laravel · FastAPI · Node.js · Streamlit · SQLite · MySQL · PostgreSQL", 19)
    line("Git · GitHub · VS Code · Jupyter · Render · Vercel · GitHub Pages", 19)

    draw.text(
        (90, height - 90),
        "Generated placeholder — not a real résumé.",
        font=font(FONT_MONO, 16),
        fill=(150, 155, 160),
    )

    print(f"resume content ends at y={y} (page height {height})")

    canvas.save(target, "PDF", resolution=150.0)
    print("wrote public/resume.pdf")


if __name__ == "__main__":
    make_og()
    rounded_icon(512, PUBLIC / "icon-512.png")
    rounded_icon(192, PUBLIC / "icon-192.png")
    rounded_icon(180, PUBLIC / "apple-touch-icon.png")
    make_resume()

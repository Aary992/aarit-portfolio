"""Generate Aarit Shah portfolio icons (amber 'A' monogram), replacing the old MarketPlay favicon."""
from PIL import Image, ImageDraw, ImageFont

EMBER = (255, 107, 26)
AMBER = (245, 158, 11)
NIGHT = (10, 10, 11)


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def make(size):
    S = size * 3  # supersample for crisp edges

    # diagonal ember -> amber gradient (built small, upscaled smooth)
    G = 64
    gs = Image.new("RGB", (G, G))
    gp = gs.load()
    for y in range(G):
        for x in range(G):
            gp[x, y] = lerp(EMBER, AMBER, (x + y) / (2 * G - 2))
    grad = gs.resize((S, S), Image.BILINEAR)

    # rounded-square mask
    mask = Image.new("L", (S, S), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [0, 0, S - 1, S - 1], radius=int(S * 0.22), fill=255)

    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    img.paste(grad, (0, 0), mask)

    # bold dark "A"
    d = ImageDraw.Draw(img)
    font = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", int(S * 0.66))
    b = d.textbbox((0, 0), "A", font=font)
    tw, th = b[2] - b[0], b[3] - b[1]
    d.text(((S - tw) / 2 - b[0], (S - th) / 2 - b[1]), "A", font=font, fill=NIGHT)

    return img.resize((size, size), Image.LANCZOS)


# App Router auto-detects these in src/app/ and emits the correct <link> tags.
make(512).save("src/app/icon.png")
make(180).save("src/app/apple-icon.png")
make(48).save("src/app/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
# Stable public URLs for the web manifest.
make(512).save("public/icon-512.png")
make(192).save("public/icon-192.png")
print("Icons written: src/app/{favicon.ico,icon.png,apple-icon.png}, public/{icon-512,icon-192}.png")

import os

def create_directory():
    os.makedirs('assets/images', exist_ok=True)

# SVG templates for shoe silhouettes
SNEAKER_PATH = """
<path d="M 60,180 C 60,180 80,210 140,210 C 200,210 230,190 280,180 C 330,170 350,150 350,120 C 350,90 320,80 300,90 C 280,100 270,120 250,110 C 230,100 200,60 170,60 C 140,60 110,100 90,120 C 70,140 60,180 60,180 Z" fill="url(#shoe-grad)" stroke="#FFFFFF" stroke-width="2" />
<path d="M 170,60 L 190,110 M 190,70 L 210,115 M 210,80 L 230,120" stroke="url(#accent-grad)" stroke-width="3" stroke-linecap="round" />
<path d="M 50,185 C 50,185 80,215 140,215 C 200,215 280,185 345,185 C 355,185 355,195 345,198 C 280,198 200,225 140,225 C 80,225 50,195 50,185 Z" fill="url(#accent-grad)" />
"""

LOAFER_PATH = """
<path d="M 70,175 C 70,175 90,195 140,195 C 190,195 240,180 290,175 C 340,170 350,150 350,130 C 350,110 330,100 310,105 C 290,110 270,125 240,125 C 210,125 180,95 150,95 C 120,95 90,135 70,175 Z" fill="url(#shoe-grad)" stroke="#FFFFFF" stroke-width="2" />
<path d="M 130,130 C 160,110 190,110 220,135" fill="none" stroke="url(#accent-grad)" stroke-width="3" />
<path d="M 60,180 C 60,180 90,200 140,200 C 190,200 280,180 345,180 C 350,180 350,188 345,190 C 280,190 190,208 140,208 C 90,208 60,190 60,180 Z" fill="url(#accent-grad)" />
"""

OXFORD_PATH = """
<path d="M 70,175 C 70,175 80,195 130,195 C 180,195 230,180 280,175 C 330,170 360,155 360,135 C 360,115 340,100 315,100 C 290,100 280,115 250,115 C 220,115 200,90 170,90 C 140,90 110,120 70,175 Z" fill="url(#shoe-grad)" stroke="#FFFFFF" stroke-width="2" />
<path d="M 170,90 C 165,115 170,140 185,150" fill="none" stroke="#FFFFFF" stroke-dasharray="2,2" stroke-width="1.5" />
<path d="M 230,115 C 235,135 250,155 285,155" fill="none" stroke="#FFFFFF" stroke-dasharray="2,2" stroke-width="1.5" />
<path d="M 65,180 C 65,180 75,195 85,195 L 85,185 Z" fill="#333" />
<path d="M 90,198 C 120,198 200,198 350,182 C 355,182 355,188 350,190 C 200,208 120,208 90,208 Z" fill="url(#accent-grad)" />
"""

SANDAL_PATH = """
<path d="M 60,190 C 120,190 200,190 340,175 C 350,175 350,185 340,190 C 200,205 120,205 60,195 C 50,195 50,190 60,190 Z" fill="url(#shoe-grad)" stroke="#FFFFFF" stroke-width="1.5" />
<path d="M 100,190 C 110,150 140,120 180,120 C 200,120 220,140 230,190" fill="none" stroke="url(#accent-grad)" stroke-width="8" stroke-linecap="round" />
<path d="M 240,190 C 250,130 280,110 310,110 C 325,110 335,130 340,175" fill="none" stroke="url(#accent-grad)" stroke-width="8" stroke-linecap="round" />
<path d="M 80,190 C 85,170 95,160 110,160 C 120,160 125,170 130,190" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" />
"""

BOOT_PATH = """
<path d="M 90,190 C 90,190 100,210 140,210 C 180,210 230,195 280,185 C 330,175 350,160 350,130 C 350,100 320,95 295,95 C 270,95 255,80 240,55 C 225,30 200,30 180,30 C 160,30 150,60 150,100 C 150,140 120,165 90,190 Z" fill="url(#shoe-grad)" stroke="#FFFFFF" stroke-width="2" />
<path d="M 180,50 L 180,110 M 200,50 L 200,110" stroke="url(#accent-grad)" stroke-width="3" stroke-linecap="round" />
<path d="M 80,195 C 80,195 100,215 140,215 C 180,215 280,192 345,190 C 355,190 355,198 345,202 C 280,204 180,225 140,225 C 100,225 80,205 80,195 Z" fill="url(#accent-grad)" />
"""

OTHER_PATH = """
<path d="M 120,180 C 120,150 150,120 180,120 C 210,120 240,150 240,180 Z M 160,120 L 160,80 L 200,80 L 200,120 Z" fill="url(#shoe-grad)" stroke="#FFFFFF" stroke-width="2" />
<circle cx="180" cy="180" r="40" fill="url(#accent-grad)" opacity="0.8" />
<path d="M 100,190 C 100,190 140,200 180,200 C 220,200 260,190 260,190 L 260,210 C 260,210 220,220 180,220 C 140,220 100,210 100,210 Z" fill="url(#accent-grad)" />
"""

def generate_svg(filename, category, index, title, price, subtitle, shoe_path, bg_start, bg_end, shoe_color_start, shoe_color_end, accent_color_start, accent_color_end):
    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{bg_start}" />
      <stop offset="100%" stop-color="{bg_end}" />
    </linearGradient>
    <linearGradient id="shoe-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{shoe_color_start}" />
      <stop offset="100%" stop-color="{shoe_color_end}" />
    </linearGradient>
    <linearGradient id="accent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{accent_color_start}" />
      <stop offset="100%" stop-color="{accent_color_end}" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000000" flood-opacity="0.15" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="400" height="300" rx="16" fill="url(#bg-grad)" />

  <!-- Grid Pattern Overlay -->
  <g opacity="0.03">
    <line x1="40" y1="0" x2="40" y2="300" stroke="#FFF" stroke-width="1"/>
    <line x1="80" y1="0" x2="80" y2="300" stroke="#FFF" stroke-width="1"/>
    <line x1="120" y1="0" x2="120" y2="300" stroke="#FFF" stroke-width="1"/>
    <line x1="160" y1="0" x2="160" y2="300" stroke="#FFF" stroke-width="1"/>
    <line x1="200" y1="0" x2="200" y2="300" stroke="#FFF" stroke-width="1"/>
    <line x1="240" y1="0" x2="240" y2="300" stroke="#FFF" stroke-width="1"/>
    <line x1="280" y1="0" x2="280" y2="300" stroke="#FFF" stroke-width="1"/>
    <line x1="320" y1="0" x2="320" y2="300" stroke="#FFF" stroke-width="1"/>
    <line x1="360" y1="0" x2="360" y2="300" stroke="#FFF" stroke-width="1"/>
  </g>

  <!-- Decorative Typography -->
  <text x="25" y="45" font-family="'Montserrat', sans-serif" font-weight="800" font-size="12" fill="{accent_color_start}" opacity="0.8" letter-spacing="2">{category.upper()}</text>
  <text x="375" y="45" font-family="'Montserrat', sans-serif" font-weight="500" font-size="12" fill="#FFFFFF" opacity="0.4" text-anchor="end">NO. {category.upper()[0:3]}-0{index}</text>
  
  <text x="200" y="270" font-family="'Montserrat', sans-serif" font-weight="300" font-size="110" fill="#FFFFFF" opacity="0.04" text-anchor="middle" letter-spacing="5">PREMIUM</text>

  <!-- Shadow Floor -->
  <ellipse cx="200" cy="215" rx="130" ry="12" fill="#000" opacity="0.25" filter="url(#shadow)" />

  <!-- Shoe Graphic Group -->
  <g transform="translate(0, 5)" filter="url(#shadow)">
    {shoe_path}
  </g>

  <!-- Product Labels -->
  <text x="25" y="255" font-family="'Noto Sans TC', 'Montserrat', sans-serif" font-weight="700" font-size="16" fill="#FFFFFF">{title}</text>
  <text x="25" y="275" font-family="'Noto Sans TC', 'Montserrat', sans-serif" font-weight="400" font-size="11" fill="#FFFFFF" opacity="0.6">{subtitle}</text>
  
  <rect x="305" y="238" width="70" height="28" rx="14" fill="{accent_color_start}" />
  <text x="340" y="257" font-family="'Montserrat', sans-serif" font-weight="700" font-size="13" fill="#1E2022" text-anchor="middle">NT$ {price}</text>
</svg>
"""
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(svg_content.strip())

def generate_logo():
    logo_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="logo-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E2022" />
      <stop offset="100%" stop-color="#111111" />
    </linearGradient>
    <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F3E7C4" />
      <stop offset="50%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#AA7C11" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="500" height="500" rx="32" fill="url(#logo-bg)" />
  
  <!-- Outer Gold Ring -->
  <circle cx="250" cy="250" r="210" fill="none" stroke="url(#gold-grad)" stroke-width="2" opacity="0.4" />
  <circle cx="250" cy="250" r="200" fill="none" stroke="url(#gold-grad)" stroke-width="4" />

  <!-- Inner Shoe Icon (Modern Line Art) -->
  <g transform="translate(110, 100)" filter="url(#glow)">
    <!-- Shoe Contour -->
    <path d="M 40,180 C 40,180 60,210 120,210 C 180,210 210,190 260,180 C 310,170 330,150 330,120 C 330,90 300,80 280,90 C 260,100 250,120 230,110 C 210,100 180,60 150,60 C 120,60 90,100 70,120 C 50,140 40,180 40,180 Z" fill="none" stroke="url(#gold-grad)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
    <!-- Sole Accent -->
    <path d="M 35,185 C 35,185 65,215 120,215 C 180,215 250,190 325,190" fill="none" stroke="url(#gold-grad)" stroke-width="3" stroke-linecap="round" />
    <!-- Dynamic Wing/Lace -->
    <path d="M 150,60 L 170,110 M 170,70 L 190,115 M 190,80 L 210,120" stroke="url(#gold-grad)" stroke-width="4" stroke-linecap="round" />
  </g>

  <!-- Typography -->
  <text x="250" y="380" font-family="'Noto Serif TC', 'Georgia', serif" font-weight="900" font-size="36" fill="url(#gold-grad)" text-anchor="middle" letter-spacing="4">呂佳穎的鞋店</text>
  <text x="250" y="415" font-family="'Montserrat', sans-serif" font-weight="600" font-size="14" fill="#FFFFFF" opacity="0.6" text-anchor="middle" letter-spacing="8">LU CHIA-YING SHOES</text>
  
  <!-- Est. Year -->
  <line x1="170" y1="440" x2="210" y2="440" stroke="url(#gold-grad)" stroke-width="1" opacity="0.6" />
  <text x="250" y="444" font-family="'Montserrat', sans-serif" font-weight="400" font-size="10" fill="url(#gold-grad)" text-anchor="middle" letter-spacing="2">EST. 2026</text>
  <line x1="290" y1="440" x2="330" y2="440" stroke="url(#gold-grad)" stroke-width="1" opacity="0.6" />
</svg>
"""
    with open('assets/images/brand_logo.svg', 'w', encoding='utf-8') as f:
        f.write(logo_content.strip())

def main():
    create_directory()
    generate_logo()
    
    # Palette definitions: premium gradients
    # bg_start, bg_end, shoe_start, shoe_end, accent_start, accent_end
    palettes = {
        'sports': ('#1A2B3C', '#0E1722', '#3B82F6', '#1D4ED8', '#60A5FA', '#3B82F6'),
        'casual': ('#2D3238', '#1A1C1E', '#F59E0B', '#B45309', '#FBBF24', '#F59E0B'),
        'formal': ('#2B2421', '#1B1513', '#A27B5C', '#634832', '#DCD7C9', '#A27B5C'),
        'sandals': ('#1E352F', '#0F1E1A', '#10B981', '#047857', '#34D399', '#10B981'),
        'boots': ('#2A2633', '#171420', '#8B5CF6', '#5B21B6', '#A78BFA', '#8B5CF6'),
        'others': ('#333333', '#1F1F1F', '#EC4899', '#BE185D', '#F472B6', '#EC4899'),
    }

    # 16 products specification
    products = [
        # Sports Shoes
        ('sports', 1, '極速狂飆 氣墊跑鞋', '3,280', 'Air Cushion Running Shoes', SNEAKER_PATH),
        ('sports', 2, '幻影編織 輕量慢跑鞋', '2,680', 'Phantom Knit Trainer', SNEAKER_PATH),
        ('sports', 3, '重力震撼 專業籃球鞋', '4,280', 'Gravity Shock Basketball Shoes', SNEAKER_PATH),
        
        # Casual Shoes
        ('casual', 1, '經典百搭 帆布板鞋', '1,680', 'Classic Canvas Sneakers', LOAFER_PATH),
        ('casual', 2, '雅痞風尚 麂皮懶人鞋', '2,480', 'Luxury Suede Loafers', LOAFER_PATH),
        ('casual', 3, '復古街頭 高筒休閒鞋', '2,180', 'Retro High-Top Sneakers', LOAFER_PATH),
        
        # Formal Leather Shoes
        ('formal', 1, '尊爵手工 德比皮鞋', '4,980', 'Premium Derby Shoes', OXFORD_PATH),
        ('formal', 2, '經典雕花 牛皮牛津鞋', '5,280', 'Classic Brogue Oxfords', OXFORD_PATH),
        ('formal', 3, '英倫雅痞 雙扣孟克鞋', '5,680', 'Double Monk Strap Shoes', OXFORD_PATH),
        
        # Sandals & Slippers
        ('sandals', 1, '野行戶外 織帶涼鞋', '1,880', 'Outdoor Webbing Sandals', SANDAL_PATH),
        ('sandals', 2, '經典水松 雙帶軟木拖鞋', '1,580', 'Classic Cork Slide Sandals', SANDAL_PATH),
        ('sandals', 3, '雲感減壓 室內防滑拖鞋', '780', 'Cozy Cloud Home Slippers', SANDAL_PATH),
        
        # Boots
        ('boots', 1, '極簡經典 雀爾喜靴', '3,980', 'Classic Chelsea Boots', BOOT_PATH),
        ('boots', 2, '硬漢型格 真皮軍靴', '4,580', 'Premium Combat Boots', BOOT_PATH),
        
        # Others
        ('others', 1, '皇家奢華 實木鞋撐與護理套裝', '1,280', 'Royal Cedar Shoe Tree & Care Kit', OTHER_PATH),
        ('others', 2, '經典編織 鞋帶與羊毛襪禮盒', '680', 'Premium Shoelaces & Wool Socks Set', OTHER_PATH),
    ]

    for cat, idx, title, price, subtitle, path in products:
        filename = f"assets/images/{cat}_{idx}.svg"
        p = palettes[cat]
        generate_svg(filename, cat, idx, title, price, subtitle, path, p[0], p[1], p[2], p[3], p[4], p[5])
        print(f"Generated {filename}")

if __name__ == "__main__":
    main()

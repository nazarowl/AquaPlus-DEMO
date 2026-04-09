# AQUAPLUS — E-Commerce Module: Claude Code Handoff Spec

> **Instructions for Claude Code:** Build a single self-contained HTML file (inline CSS + JS, no external dependencies except Google Fonts) that implements a fully interactive e-commerce prototype for a pool/spa company. Every screen, interaction, price, product, and layout is defined below. Do not improvise — follow this spec exactly.

---

## GLOBAL RULES

### Branding (match exactly)

```
Primary Background:   #1C355E  (dark navy)
Accent Light Blue:    #79C7EE
CTA Blue:             #238DC1
CTA Hover:            #0B6A9A
Pale Blue BG:         #B9E3F8
White:                #FFFFFF
Light Gray BG:        #F4F4F4
Body Text Dark:       #112337
Secondary Text:       #6C6E70
Border Gray:          #E0E0E0
Success Green:        #28A745
Warning Orange:       #F5A623
Error Red:            #C02B0A

Heading Font:         'Parkinsans', serif  (Google Fonts import)
Body Font:            'Figtree', sans-serif  (Google Fonts import)

Border Radius:        8px (buttons), 12px (cards), 16px (modals)
Box Shadow (cards):   0 2px 12px rgba(0,0,0,0.08)
Transition Default:   all 0.3s ease
```

### Responsive Breakpoints

```
Desktop:   >= 1024px   (max-width container: 1200px, centered)
Tablet:    768–1023px
Mobile:    < 768px
```

### Language

All UI text in **French (Quebec)**. Currency: **CAD ($)**. Tax display: show subtotal, then "TPS (5%)" and "TVQ (9.975%)" as separate lines, then total.

---

## FILE STRUCTURE

Single HTML file. Three main views managed by JS state (no page reloads):

1. **Quote Builder** — `/quote`
2. **Accessories Boutique** — `/boutique`
3. **Deposit & Booking** — `/booking`

Plus a persistent **header** and **cart sidebar**.

---

## HEADER (persistent, all views)

```
┌──────────────────────────────────────────────────────────────────┐
│  [Logo: AQUA PLUS]          NAV LINKS              [Cart Icon]  │
│  Piscines et Spas    Soumission | Boutique | Réserver    🛒 (3) │
└──────────────────────────────────────────────────────────────────┘
```

- Logo: text "AQUA" in white bold + "PLUS" in light blue (#79C7EE), subtitle "PISCINES ET SPAS" in small caps below
- Nav links: "Soumission" (opens Quote Builder), "Boutique" (opens shop), "Réserver" (opens booking)
- Cart icon: shopping bag with item count badge (CTA Blue circle, white number)
- Background: #1C355E
- Height: 70px
- Sticky top

---

## MODULE 1: SMART QUOTE BUILDER

### Screen 1 — Choose Type

```
┌──────────────────────────────────────────────────────┐
│          CONFIGUREZ VOTRE PROJET                     │
│     Obtenez une estimation de prix instantanée       │
│                                                      │
│   ┌─────────────────┐   ┌─────────────────┐         │
│   │   [Pool Image]  │   │   [Spa Image]   │         │
│   │                 │   │                  │         │
│   │   PISCINE       │   │   SPA ENCASTRÉ   │         │
│   │   À partir de   │   │   À partir de    │         │
│   │   19 500 $      │   │   8 500 $        │         │
│   │                 │   │                  │         │
│   │  [Configurer →] │   │  [Configurer →]  │         │
│   └─────────────────┘   └─────────────────┘         │
└──────────────────────────────────────────────────────┘
```

- Background: #F4F4F4
- Cards: white, 12px border-radius, hover: lift shadow + border turns #79C7EE
- Each card 300px wide, 400px tall, centered with 40px gap
- Pool image placeholder: solid #B9E3F8 rectangle with centered pool icon (SVG outline)
- Spa image placeholder: solid #B9E3F8 rectangle with centered spa icon (SVG outline)

### Screen 2 — Select Model

Progress bar at top: Step 1 (active) / Step 2 / Step 3 / Step 4

```
┌──────────────────────────────────────────────────────┐
│  ← Retour     ÉTAPE 1 DE 4: CHOISISSEZ VOTRE MODÈLE │
│                                                      │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐        │
│  │Diamant │ │Larimar │ │Lazuli  │ │Opale   │        │
│  │8x10'   │ │10x25'  │ │12x28'  │ │8x16'   │        │
│  │19 500$ │ │27 000$ │ │32 000$ │ │24 500$ │        │
│  └────────┘ └────────┘ └────────┘ └────────┘        │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐        │
│  │Perla   │ │Quartz  │ │Saphir  │ │Tanza   │        │
│  │12x24'  │ │14x31'  │ │14x31'  │ │8x11'   │        │
│  │29 500$ │ │35 000$ │ │36 500$ │ │18 000$ │        │
│  └────────┘ └────────┘ └────────┘ └────────┘        │
│  ┌────────┐ ┌────────┐                               │
│  │Topaze  │ │Zircon  │                               │
│  │8x14'   │ │12x22'  │                               │
│  │22 500$ │ │30 000$ │                               │
│  └────────┘ └────────┘                               │
└──────────────────────────────────────────────────────┘
```

Model cards: 220px wide, white bg, 12px radius. Show: model name (bold, 16px), primary size, starting price. Selected state: #238DC1 border (2px), light blue bg tint. 4 per row desktop, 2 tablet, 1 mobile.

#### Pool Model Pricing Data

| Model | Sizes | Depth | Base Price |
|---|---|---|---|
| Diamant | 8x10' | 3'9" | $19,500 |
| Larimar | 10x25' | 4'6" | $27,000 |
| Lazuli | 12x28' / 12x32' | 4'10" | $32,000 / $35,500 |
| Opale | 8x16' / 12x20' | 4'9" / 4'10" | $24,500 / $28,000 |
| Perla | 12x24' | 4'10" | $29,500 |
| Quartz | 14x31' / 14x36' | 4'10" | $35,000 / $39,000 |
| Saphir | 14x31' / 14x36' | 4'10" | $36,500 / $41,000 |
| Tanza | 8x11' | 10" | $18,000 |
| Topaze | 8x14' / 12x20' / 12x24' / 12x26' | 4'10" | $22,500 / $28,000 / $30,500 / $32,000 |
| Zircon | 12x22' / 12x27' | 5' | $30,000 / $33,500 |

#### Spa Model Pricing Data

| Model | Dimensions | Depth | Base Price |
|---|---|---|---|
| Hollow retombée | 7'9" x 7'9" | 3'9" | $12,500 |
| Hollow | 7'9" x 7'9" | 3'9" | $10,500 |
| Roslyn | 7'4" x 7'4" | 2'7.5" | $8,500 |
| Trent | 8'6" x 8'6" | 3'7" | $13,000 |
| York | 7'9" x 11'4" | 3' | $14,500 |

### Screen 3 — Choose Size (if multiple) + Color

Progress bar: Step 2 (active)

If model has multiple sizes, show size selector first (radio buttons, horizontal).

Then show color picker:

```
┌──────────────────────────────────────────────────────┐
│  ← Retour     ÉTAPE 2 DE 4: PERSONNALISEZ            │
│                                                      │
│  Taille:  ○ 12x28' (32 000$)   ● 12x32' (35 500$)  │
│                                                      │
│  ── Couleurs de base (incluses) ──────────────────── │
│  ┌──────────┐  ┌──────────┐                          │
│  │ [swatch] │  │ [swatch] │                          │
│  │ Sel de   │  │ Gris     │                          │
│  │ mer      │  │ arctique │                          │
│  │ Inclus   │  │ Inclus   │                          │
│  └──────────┘  └──────────┘                          │
│                                                      │
│  ── Couleurs premium (+1 500 $) ─────────────────── │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐  │
│  │ [swatch] │ │ [swatch] │ │ [swatch] │ │[swatch]│  │
│  │ Aqua     │ │ Galaxie  │ │ Bleu     │ │Gris    │  │
│  │          │ │          │ │ pacifique│ │océan   │  │
│  │ +1 500$  │ │ +1 500$  │ │ +1 500$  │ │+1 500$ │  │
│  └──────────┘ └──────────┘ └──────────┘ └────────┘  │
└──────────────────────────────────────────────────────┘
```

Color swatches: 100px x 80px rounded rectangles. Use these solid colors as placeholders for the textures:

| Color | Swatch Hex |
|---|---|
| Sel de mer | #F5F0E8 |
| Gris arctique | #C8CDD0 |
| Aqua | #7EC8D9 |
| Galaxie | #2C3E6B |
| Bleu pacifique | #1A6B8A |
| Gris océan | #6B7D8A |

Selected state: 3px solid #238DC1 border, checkmark overlay top-right.

Premium color surcharge: **$1,500** for pools, **$800** for spas.

### Screen 4 — Add-Ons

Progress bar: Step 3 (active)

```
┌──────────────────────────────────────────────────────┐
│  ← Retour     ÉTAPE 3 DE 4: OPTIONS                  │
│                                                      │
│  ☐  Système de chauffage (thermopompe)    + 3 800 $  │
│  ☐  Éclairage LED couleur intégré         +   650 $  │
│  ☐  Couverture automatique rétractable    + 5 200 $  │
│  ☐  Système au sel                        +   950 $  │
│  ☐  Jet de nage (contre-courant)          + 4 500 $  │
│  ☐  Escalier intégré gelcoat              + 1 200 $  │
│  ☐  Clôture de sécurité (conforme)        + 3 500 $  │
│  ☐  Aménagement paysager                  Sur demande│
│                                                      │
│ ┌──────────────────────────────────────────────────┐ │
│ │ VOTRE ESTIMATION        Sous-total:   38 150 $   │ │
│ │                         TPS (5%):      1 907 $   │ │
│ │                         TVQ (9.975%):  3 805 $   │ │
│ │                         ─────────────────────    │ │
│ │                         TOTAL:        43 862 $   │ │
│ │                     [Voir mon résumé →]          │ │
│ └──────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

#### Pool Add-On Prices

| Add-On | Price |
|---|---|
| Système de chauffage (thermopompe) | $3,800 |
| Éclairage LED couleur intégré | $650 |
| Couverture automatique rétractable | $5,200 |
| Système au sel | $950 |
| Jet de nage (contre-courant) | $4,500 |
| Escalier intégré gelcoat | $1,200 |
| Clôture de sécurité (conforme) | $3,500 |
| Aménagement paysager | "Sur demande" (no price, shows note) |

#### Spa Add-On Prices

| Add-On | Price |
|---|---|
| Système de chauffage premium | $1,200 |
| Éclairage d'ambiance LED | $450 |
| Couverture isolante rigide | $850 |
| Système audio Bluetooth | $750 |
| Aromathérapie intégrée | $350 |

Each add-on row: checkbox left, name center, price right. Hover: light blue bg tint. Checked: blue checkbox, row gets left #238DC1 border.

**Sticky price bar** at bottom of viewport:
- Height: 80px
- BG: #1C355E
- Left: "Votre estimation" in white + total in bold 24px
- Right: "Voir mon résumé →" button (white bg, #1C355E text)
- Slides up from bottom when screen 4 is reached

### Screen 5 — Quote Summary

Progress bar: Step 4 (active)

```
┌──────────────────────────────────────────────────────┐
│          RÉSUMÉ DE VOTRE CONFIGURATION               │
│                                                      │
│  ┌─────────────────────────────────────────────────┐ │
│  │ Modèle:     Lazuli 12x32'                       │ │
│  │ Couleur:    Bleu pacifique (premium)             │ │
│  │ Profondeur: 4'10"                                │ │
│  │                                                  │ │
│  │ Options sélectionnées:                           │ │
│  │  ✓ Système de chauffage          3 800 $         │ │
│  │  ✓ Éclairage LED                   650 $         │ │
│  │  ✓ Clôture de sécurité           3 500 $         │ │
│  │                                                  │ │
│  │ ─────────────────────────────────────────        │ │
│  │ Piscine (base):              35 500 $            │ │
│  │ Couleur premium:              1 500 $            │ │
│  │ Options:                      7 950 $            │ │
│  │ Sous-total:                  44 950 $            │ │
│  │ TPS (5%):                     2 247 $            │ │
│  │ TVQ (9.975%):                 4 484 $            │ │
│  │ ═══════════════════════════════════              │ │
│  │ ESTIMATION TOTALE:           51 681 $            │ │
│  └─────────────────────────────────────────────────┘ │
│                                                      │
│  ⓘ Ce prix est une estimation. Le prix final sera    │
│    confirmé lors de votre soumission personnalisée.  │
│                                                      │
│  [← Modifier]  [Demander ma soumission →]            │
│                 [Réserver mon installation →]         │
└──────────────────────────────────────────────────────┘
```

Summary card: white bg, 16px padding, 12px radius. All line items left-aligned with prices right-aligned (use CSS grid or flexbox with justify-between).

"Demander ma soumission" = primary CTA (#238DC1 bg, white text, full width).
"Réserver mon installation" = secondary CTA (outlined #238DC1, below primary).
"Modifier" = text link, left-aligned.

### Screen 6 — Quote Request Form

Modal overlay (dark navy 80% opacity backdrop). White modal, 600px max-width, centered.

```
┌──────────────────────────────────────────────────────┐
│  ✕                                                   │
│         DEMANDER VOTRE SOUMISSION                    │
│                                                      │
│  Prénom *          [___________________________]     │
│  Nom *             [___________________________]     │
│  Courriel *        [___________________________]     │
│  Téléphone *       [___________________________]     │
│  Ville *           [___________________________]     │
│  Période souhaitée [Printemps / Été / Automne / Flex]│
│  Message           [___________________________]     │
│                    [___________________________]     │
│                                                      │
│  Votre configuration:                                │
│  Lazuli 12x32' | Bleu pacifique | 3 options          │
│  Estimation: 51 681 $                                │
│                                                      │
│           [Envoyer ma demande →]                     │
└──────────────────────────────────────────────────────┘
```

Form inputs: 48px height, 1px #E0E0E0 border, 8px radius, 16px padding. Focus: #238DC1 border. Labels above inputs, 14px, #6C6E70.

On submit: show success state in same modal — green checkmark icon, "Merci! Votre demande a été envoyée. Notre équipe vous contactera dans les 24h." + "Retour à l'accueil" button.

---

## MODULE 2: ACCESSORIES BOUTIQUE

### Boutique Main View

```
┌──────────────────────────────────────────────────────┐
│          BOUTIQUE AQUAPLUS                            │
│  Tout pour l'entretien de votre piscine et spa       │
│                                                      │
│  [Tout] [Chimique] [Entretien] [Couvertures]         │
│  [Filtration] [Éclairage] [Accessoires] [Kits]       │
│                                                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐             │
│  │ [image]  │ │ [image]  │ │ [image]  │             │
│  │ Chlore   │ │ pH+      │ │ Robot    │             │
│  │ granules │ │ 2kg      │ │ nettoyeur│             │
│  │ 15kg     │ │          │ │          │             │
│  │ 219.99 $ │ │ 18.99 $  │ │ 899.99 $ │             │
│  │[Ajouter] │ │[Ajouter] │ │[Ajouter] │             │
│  └──────────┘ └──────────┘ └──────────┘             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐             │
│  │  ...     │ │  ...     │ │  ...     │             │
│  └──────────┘ └──────────┘ └──────────┘             │
└──────────────────────────────────────────────────────┘
```

Category filter: horizontal scrollable pill buttons. Active pill: #238DC1 bg white text. Inactive: white bg, #1C355E text, 1px border.

Product grid: 3 columns desktop, 2 tablet, 1 mobile. Gap: 24px.

Product card: white bg, 12px radius, shadow. Image area: 200px height, #F4F4F4 bg with centered product icon. Below: name (bold, 15px), description (13px, #6C6E70, max 2 lines), price (bold, 18px, #1C355E), "Ajouter au panier" button (full width, #238DC1, white text, 40px height).

#### FULL PRODUCT CATALOG (dummy data)

**Produits chimiques**

| ID | Name | Description | Price | Badge |
|---|---|---|---|---|
| C01 | Chlore en granules 15 kg | Traitement choc haute concentration 70% | $219.99 | Populaire |
| C02 | Chlore en pastilles 10 kg | Dissolution lente pour traitement continu | $149.99 | — |
| C03 | pH+ (2 kg) | Augmente le pH de l'eau | $18.99 | — |
| C04 | pH- (2 kg) | Diminue le pH de l'eau | $18.99 | — |
| C05 | Algicide concentré 1L | Prévient et élimine les algues | $24.99 | — |
| C06 | Clarifiant 1L | Eau cristalline en 24h | $16.99 | — |
| C07 | Sel pour piscine 20 kg | Pour systèmes au sel | $12.99 | — |
| C08 | Traitement choc 1.8 kg | Oxydation rapide sans chlore | $24.99 | — |

**Entretien**

| ID | Name | Description | Price | Badge |
|---|---|---|---|---|
| E01 | Épuisette de surface | Filet fin pour feuilles et débris | $29.99 | — |
| E02 | Balai de paroi 18" | Brosse pour parois en fibre de verre | $34.99 | — |
| E03 | Aspirateur manuel | Kit complet avec manche télescopique | $89.99 | — |
| E04 | Robot nettoyeur automatique | Nettoyage fond et parois programmable | $899.99 | Populaire |
| E05 | Trousse d'analyse d'eau | Testeur pH, chlore, alcalinité | $39.99 | — |
| E06 | Manche télescopique 16' | Aluminium léger, compatible tous accessoires | $44.99 | — |

**Couvertures**

| ID | Name | Description | Price | Badge |
|---|---|---|---|---|
| V01 | Toile solaire 12x24' | Réchauffe l'eau naturellement, réduit l'évaporation | $189.99 | — |
| V02 | Toile solaire 14x31' | Grand format pour piscines familiales | $249.99 | — |
| V03 | Couverture d'hiver 12x24' | Protection hivernale résistante aux intempéries | $299.99 | — |
| V04 | Couverture d'hiver 14x36' | Grand format, attaches incluses | $399.99 | — |
| V05 | Couverture de spa | Isolante rigide, charnière centrale | $449.99 | — |

**Filtration**

| ID | Name | Description | Price | Badge |
|---|---|---|---|---|
| F01 | Filtre à cartouche | Remplacement universel, haute capacité | $69.99 | — |
| F02 | Sable filtrant 50 lb | Sable de silice #20 pour filtre à sable | $29.99 | — |
| F03 | Pompe 1.5 HP | Pompe haute performance, silencieuse | $549.99 | Nouveau |
| F04 | Verre filtrant 25 kg | Alternative écologique au sable | $54.99 | Nouveau |

**Éclairage**

| ID | Name | Description | Price | Badge |
|---|---|---|---|---|
| L01 | Ampoule LED piscine | RGB couleur, télécommande incluse | $79.99 | — |
| L02 | Éclairage solaire flottant | Set de 3, rechargement solaire | $49.99 | Populaire |
| L03 | Bande LED contour piscine 5m | Étanche IP68, couleurs programmables | $129.99 | — |

**Accessoires**

| ID | Name | Description | Price | Badge |
|---|---|---|---|---|
| A01 | Échelle inox 3 marches | Acier inoxydable, antidérapante | $199.99 | — |
| A02 | Thermomètre flottant | Lecture facile, design aquatique | $14.99 | — |
| A03 | Jeu de volleyball piscine | Filet + ballon, installation facile | $79.99 | — |
| A04 | Flotteur distributeur chlore | Capacité 3 pastilles, ajustable | $12.99 | — |
| A05 | Douche solaire extérieure | 35L, eau chauffée au soleil | $249.99 | — |

**Kits saisonniers**

| ID | Name | Description | Price | Badge |
|---|---|---|---|---|
| K01 | Kit d'ouverture piscine | Chlore choc, algicide, clarifiant, pH | $89.99 | Populaire |
| K02 | Kit de fermeture piscine | Produits hivernaux complets | $79.99 | — |
| K03 | Kit d'entretien mensuel | Approvisionnement 1 mois complet | $49.99 | — |

### Cart Sidebar

Slides in from right. Width: 400px. Dark overlay behind (rgba(0,0,0,0.5)).

```
┌──────────────────────────┐
│  ✕  VOTRE PANIER (3)     │
│                          │
│  ┌──────────────────────┐│
│  │ [img] Chlore 15kg    ││
│  │       [-] 1 [+]      ││
│  │       219.99 $       ││
│  └──────────────────────┘│
│  ┌──────────────────────┐│
│  │ [img] pH+ 2kg        ││
│  │       [-] 2 [+]      ││
│  │       37.98 $        ││
│  └──────────────────────┘│
│  ┌──────────────────────┐│
│  │ [img] Kit ouverture  ││
│  │       [-] 1 [+]      ││
│  │       89.99 $        ││
│  │       [🗑 Retirer]    ││
│  └──────────────────────┘│
│                          │
│  Sous-total:    347.96 $ │
│  TPS (5%):       17.40 $ │
│  TVQ (9.975%):   34.71 $ │
│  ─────────────────────── │
│  TOTAL:         400.07 $ │
│                          │
│  [Passer à la caisse →]  │
│  Continuer mes achats    │
└──────────────────────────┘
```

Quantity controls: minus/plus buttons (32px circles, #F4F4F4 bg, #1C355E text). Remove: red text link "Retirer".

### Checkout Flow

3 steps shown as horizontal progress bar.

**Step 1 — Livraison**

Same form layout as quote request form but with full address fields:

| Field | Type | Required | Default |
|---|---|---|---|
| Prénom | text | Yes | — |
| Nom | text | Yes | — |
| Courriel | email | Yes | — |
| Téléphone | tel | Yes | — |
| Adresse | text | Yes | — |
| Appartement | text | No | — |
| Ville | text | Yes | — |
| Province | select | Yes | Québec |
| Code postal | text (A1A 1A1 format) | Yes | — |

**Step 2 — Livraison method**

Three radio options as cards:

| Option | Price | Description |
|---|---|---|
| Ramassage en magasin | Gratuit | Prêt en 24h — Québec, QC |
| Livraison locale | $15.00 | Région de Québec (2–3 jours) |
| Livraison standard | $25.00 | Partout au Québec (3–5 jours ouvrables) |

Selected: #238DC1 border, light blue bg tint.

**Step 3 — Paiement**

```
┌──────────────────────────────────────────────────────┐
│  PAIEMENT SÉCURISÉ  🔒                               │
│                                                      │
│  Numéro de carte    [________________________]       │
│  Date d'expiration  [MM/AA]     CVC [___]            │
│  Nom sur la carte   [________________________]       │
│                                                      │
│  ┌────── Résumé ──────────────────────────────┐      │
│  │ 3 articles                      347.96 $   │      │
│  │ Livraison locale                 15.00 $   │      │
│  │ TPS (5%)                         18.15 $   │      │
│  │ TVQ (9.975%)                     36.20 $   │      │
│  │ ─────────────────────────────────────      │      │
│  │ TOTAL                           417.31 $   │      │
│  └────────────────────────────────────────────┘      │
│                                                      │
│           [Confirmer le paiement →]                  │
└──────────────────────────────────────────────────────┘
```

**Confirmation screen:** Green checkmark animation (CSS), "Merci pour votre commande!", order number (#AQ-2026-XXXX), email confirmation note, order summary, "Retour à la boutique" CTA.

---

## MODULE 3: DEPOSIT & BOOKING

Accessed from the quote summary screen ("Réserver mon installation" button).

### Step 1 — Installation Period

```
┌──────────────────────────────────────────────────────┐
│     RÉSERVEZ VOTRE INSTALLATION                      │
│                                                      │
│     Votre config: Lazuli 12x32' Bleu pacifique       │
│     Estimation: 51 681 $                             │
│                                                      │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐       │
│  │ PRINTEMPS  │ │    ÉTÉ     │ │  AUTOMNE   │       │
│  │ Avr — Mai  │ │ Juin — Août│ │ Sep — Oct  │       │
│  │            │ │            │ │            │       │
│  │ 4 places   │ │ 2 places   │ │ 6 places   │       │
│  │ disponibles│ │ Presque    │ │ disponibles│       │
│  │  🟢        │ │ complet 🟠 │ │  🟢        │       │
│  └────────────┘ └────────────┘ └────────────┘       │
│                                                      │
│  Semaine préférée (optionnel):                       │
│  [Sélectionnez une semaine ▼]                        │
│                                                      │
│                    [Continuer →]                      │
└──────────────────────────────────────────────────────┘
```

Period cards: 250px wide, white bg, 12px radius. Selected: #238DC1 border. Availability badges: green circle = "disponibles", orange = "Presque complet", gray = "Complet" (disabled, not selectable).

Week selector: dropdown, only shows weeks within selected period.

### Step 2 — Deposit Selection

```
┌──────────────────────────────────────────────────────┐
│     CHOISISSEZ VOTRE DÉPÔT                           │
│                                                      │
│  ┌────────────────────────────────────────────┐      │
│  │ ○ DÉPÔT STANDARD                          │      │
│  │   500 $                                    │      │
│  │   Réserve votre plage d'installation       │      │
│  └────────────────────────────────────────────┘      │
│                                                      │
│  ┌────────────────────────────────────────────┐      │
│  │ ○ DÉPÔT PREMIUM                  Populaire │      │
│  │   1 000 $                                  │      │
│  │   Installation prioritaire +               │      │
│  │   consultation design incluse              │      │
│  └────────────────────────────────────────────┘      │
│                                                      │
│  ⓘ Votre dépôt sera déduit du montant total.        │
│    Remboursable jusqu'à 30 jours avant               │
│    la date d'installation.                           │
│                                                      │
│                    [Procéder au paiement →]           │
└──────────────────────────────────────────────────────┘
```

Radio card selection. "Populaire" badge: #79C7EE bg, #1C355E text, top-right corner.

### Step 3 — Payment

Same payment form layout as boutique checkout, but amount shows deposit only (e.g., "$500.00" or "$1,000.00"). No tax on deposits — show "Dépôt de réservation" as single line item.

### Step 4 — Confirmation

```
┌──────────────────────────────────────────────────────┐
│         ✓ RÉSERVATION CONFIRMÉE                      │
│                                                      │
│  Numéro de réservation: #AQ-RES-2026-XXXX           │
│                                                      │
│  Période:     Été 2026                               │
│  Dépôt payé:  1 000 $                               │
│  Modèle:      Lazuli 12x32' — Bleu pacifique        │
│  Options:     Chauffage, LED, Clôture                │
│  Estimation:  51 681 $                               │
│                                                      │
│  Prochaines étapes:                                  │
│  Notre équipe vous contactera dans les 48h           │
│  pour confirmer les détails de votre projet.         │
│                                                      │
│  📧 Un courriel de confirmation a été envoyé.        │
│                                                      │
│  [Ajouter au calendrier]  [Retour à l'accueil]      │
└──────────────────────────────────────────────────────┘
```

Green checkmark: animated (scale in from 0 to 1, 0.5s ease). Confirmation card: white, centered, max-width 600px.

---

## INTERACTION & ANIMATION SPECS

| Interaction | Behavior |
|---|---|
| Color swatch click | Instant swap, no animation. Selected swatch gets border + checkmark |
| Add-on checkbox toggle | Price bar updates with 0.3s number count animation |
| Add to cart (boutique) | Button briefly shows "✓ Ajouté" (green bg, 1.5s) then reverts. Cart icon badge bounces. Toast appears top-right for 3s |
| Cart quantity +/- | Instant price recalculation, 0.2s fade on price number |
| Step navigation | Slide left/right transition (0.4s ease). "Retour" slides right, "Continuer" slides left |
| Modal open | Fade in backdrop (0.3s), modal slides up from bottom (0.4s ease) |
| Modal close | Reverse of open |
| Form validation | Real-time — red border + message below field on blur if invalid. Check mark if valid |
| Sticky price bar | Slides up from bottom (0.3s) on first interaction with add-ons |
| Cart sidebar | Slides in from right (0.3s ease) |
| Success checkmark | Scale animation 0→1 (0.5s ease-out) with green circle pulse behind |

---

## EMPTY & ERROR STATES

| State | Display |
|---|---|
| Empty cart | Centered: cart icon (64px, #E0E0E0), "Votre panier est vide", "Parcourir la boutique →" link |
| No search results | "Aucun produit trouvé" + "Voir toutes les catégories" link |
| Form error | Red (#C02B0A) border on field, error text below: "Ce champ est requis" |
| Payment error | Red banner top of form: "Erreur de paiement. Veuillez réessayer." |
| Network error | Yellow (#F5A623) banner: "Problème de connexion. Vos données sont sauvegardées." |

---

## WHAT THIS PROTOTYPE SHOULD NOT DO

- No real payment processing (simulate only)
- No backend / API calls
- No user accounts or login
- No real email sending (show confirmation UI only)
- Cart data lives in JS memory only (lost on refresh is OK for prototype)
- All images are solid color placeholders with icons — no real photos needed

---

## FINAL CHECKLIST FOR CLAUDE CODE

- [ ] Single HTML file, self-contained (inline CSS + JS)
- [ ] Google Fonts imported: Figtree + Parkinsans
- [ ] All 3 modules functional and navigable
- [ ] Cart persists across module navigation within session
- [ ] All prices calculate correctly with Quebec tax (TPS 5% + TVQ 9.975%)
- [ ] Responsive at all 3 breakpoints
- [ ] All text in French
- [ ] All dummy product data populated
- [ ] Form validation working (required fields)
- [ ] Step progress indicators on all multi-step flows
- [ ] Smooth transitions between steps
- [ ] Empty states for cart and search
- [ ] Color swatches selectable with visual feedback
- [ ] Sticky price bar in quote builder
- [ ] "Retour" navigation on every step

# 📝 Escena Interactiva en Three.js  
**Modelos utilizados:** `cloud_lego_mini_fig.glb`, `lego_dark_saber.glb`, `lego-house.glb`

---

## 1. 🌍 Concepto del Mundo Creado

La escena representa un **micro–mundo Lego estilizado**, compuesto por una casa, una mini-figura y un “dark saber” como elemento dinámico.  
El objetivo es demostrar un pipeline completo con Three.js: carga de modelos GLB, materiales PBR, iluminación física, shaders procedurales, animaciones y alternancia de cámaras.

El estilo combina estética de juguete con iluminación semi-realista para generar contraste y profundidad visual.

<img src=".\Imagenes\Escena 1.png" alt="Escena 1" width="600"/>


---

## 2. 📦 Modelos GLB Utilizados

### **cloud_lego_mini_fig.glb**
- **Fuente:** Archivo proporcionado por el usuario.  
- **Modificaciones aplicadas:**
  - Escala ajustada para mantener proporciones con la casa.
  - Rotación inicial hacia la cámara principal.
  - Material PBR customizado con roughness moderado para simular plástico.

### **lego_dark_saber.glb**
- **Fuente:** Archivo proporcionado por el usuario.  
- **Modificaciones aplicadas:**
  - Escala reducida para armonizar con la mini-figura.
  - Material metálico con componente de emisión para simular energía.
  - Animación rotacional o de levitación.

### **lego-house.glb**
- **Fuente:** Archivo proporcionado por el usuario.  
- **Modificaciones aplicadas:**
  - Escala global adaptada como base del entorno.
  - Reposicionamiento centrado.
  - Material PBR ajustado para imitar acabado plástico Lego.

  <img src=".\Imagenes\Escena 2.png" alt="Escena 1" width="600"/>

---

## 3. 💡 Iluminación Implementada

La escena combina iluminación cinematográfica con técnicas de HDRI.

### **Key Light**
- Tipo: `DirectionalLight`  
- Intensidad: 1.0–1.2  
- Función: generar sombras principales y volumen en los modelos.

### **Fill Light**
- Tipo: `HemisphereLight` o `AmbientLight`  
- Función: suavizar sombras y aportar iluminación global.

### **Rim Light**
- Tipo: `PointLight` colocada detrás del dark saber  
- Función: crear contorno luminoso y resaltar siluetas.

### **Iluminación Ambiental (HDRI)**
- Entorno neutro o ligeramente azulado para coherencia cromática.

### **Presets**
- **Día:** luz fría, sombras definidas.  
- **Atardecer:** tonos cálidos, sombras largas y suaves.

<img src=".\Imagenes\Luces 1.png" alt="Escena 1" width="600"/>
---

## 4. 🎨 Materiales y Texturas (PBR)

| Modelo | Roughness | Metalness | Normal Map | Justificación |
|--------|-----------|-----------|------------|----------------|
| Mini-figura | 0.4–0.6 | 0 | Opcional | Simulación de plástico mate Lego. |
| Dark Saber | 0.1 | 0.7–1.0 | Opcional | Apariencia metálica con emisión energética. |
| Casa | 0.5 | 0 | Opcional | Material plástico suave característico de piezas Lego. |

Los valores de PBR permiten diferenciar materiales según su respuesta a la luz.

<img src=".\Imagenes\materiales 1.png" alt="Escena 1" width="600"/>
---



## 5. 🎥 Cámaras

### **Cámara Perspectiva**
- Tipo: `PerspectiveCamera`  
- Uso principal: vista inmersiva del mundo Lego.  
- Intención: transmitir profundidad y escala realista.

<img src=".\Imagenes\Camara 3.png" alt="Camara  2" width="600"/>
### **Cámara Ortográfica**
- Tipo: `OrthographicCamera`  
- Uso: vista estilo catálogo o maqueta.  
- Intención: resaltar proporciones geométricas sin distorsión.

La alternancia se realiza mediante un evento o botón que activa la cámara correspondiente.

<img src=".\Imagenes\Camara 2.png" alt="Camara  2" width="600"/>
---

## 7. 🎬 Animaciones

### **Mini-figura**
- Movimiento leve (idle) o rotación para añadir vida.

### **Dark Saber**
- Rotación continua o levitación.
- Posible animación de emisión o glow.

### **Cámara**
- Movimiento de entrada (orbitar) o transición suave entre cámaras.

### **Luces**
- Ligera oscilación del rim light para dar dinamismo.

---
<img src=".\Imagenes\escena.gif" alt="Camara  2" width="600"/>

## 8. 🎨 Modelo de Color / Paleta

La paleta se basa en contrastes perceptuales (CIELAB):

| Color | Aplicación | Justificación |
|--------|------------|----------------|
| Tonos primarios Lego (rojo, azul, amarillo) | Casa y mini_fig | Alta saturación, gran contraste perceptual. |
| Azul claro | Iluminación ambiental | Resalta amarillos y rojos del Lego. |
| Blanco brillante | Dark saber | Máxima visibilidad sobre la paleta base. |

---


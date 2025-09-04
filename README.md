# Sistema de Invitaciones de Boda - Luis & Martha

Una invitación de boda web interactiva que permite personalizar el nombre del invitado y confirmar asistencia mediante WhatsApp.

## 🌟 Características

- **Personalización automática**: Cada invitado recibe una invitación con su nombre personalizado
- **Confirmación por WhatsApp**: Los invitados pueden confirmar su asistencia directamente por WhatsApp
- **Diseño responsivo**: Funciona perfectamente en dispositivos móviles y desktop
- **Panel de administración**: Genera enlaces personalizados para cada invitado
- **Fácil de usar**: Solo requiere HTML, CSS, Bootstrap y JavaScript

## 🚀 Configuración Rápida

### 1. Configurar el número de WhatsApp

Edita el archivo `script.js` y cambia el número de WhatsApp en la línea 4:

```javascript
const CONFIG = {
    whatsappNumber: '573001234567', // Reemplazar con tu número real
    adminPassword: 'admin123' // Cambiar por una contraseña segura
};
```

**Formato del número de WhatsApp:**
- Incluye el código de país sin el símbolo +
- Ejemplo para Colombia: `573001234567`
- Ejemplo para México: `521234567890`
- Ejemplo para España: `34612345678`

### 2. Personalizar la información del evento

Edita el archivo `index.html` para cambiar:
- Nombres de los novios
- Fecha y hora del evento
- Lugar y dirección
- Cualquier otro detalle específico

### 3. Cambiar las imágenes

Reemplaza la URL de la imagen en `index.html` (línea 35) con tu propia imagen:

```html
<img src="TU_IMAGEN_AQUI" alt="Luis & Martha" class="img-fluid rounded-circle couple-img">
```

## 📱 Cómo usar el sistema

### Para el organizador del evento:

1. **Acceder al panel de administración:**
   - Presiona `Ctrl + Shift + A` en la página
   - O agrega `?admin=admin123` al final de la URL
   - Ingresa la contraseña configurada

2. **Generar invitaciones personalizadas:**
   - Escribe el nombre del invitado
   - Copia el enlace generado
   - Comparte el enlace con el invitado

### Para los invitados:

1. **Recibir la invitación:**
   - Hacer clic en el enlace personalizado
   - Ver la invitación con su nombre incluido

2. **Confirmar asistencia:**
   - Llenar el formulario de confirmación
   - Hacer clic en "Confirmar por WhatsApp"
   - Se abrirá WhatsApp con el mensaje pre-escrito

## 🌐 Despliegue en GitHub Pages

### Opción 1: Subir archivos directamente

1. Crea un nuevo repositorio en GitHub
2. Sube todos los archivos del proyecto
3. Ve a Settings > Pages
4. Selecciona "Deploy from a branch"
5. Elige "main" branch y "/ (root)"
6. Tu sitio estará disponible en: `https://tu-usuario.github.io/nombre-repositorio`

### Opción 2: Fork y personalizar

1. Haz fork de este repositorio
2. Clona tu fork localmente
3. Personaliza los archivos según tus necesidades
4. Haz commit y push de los cambios
5. Activa GitHub Pages en la configuración del repositorio

## 🔧 Personalización Avanzada

### Cambiar colores y estilos

Edita las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #8B4513;    /* Color principal */
    --secondary-color: #D2B48C;  /* Color secundario */
    --accent-color: #F5DEB3;     /* Color de acento */
    --text-dark: #4A4A4A;        /* Texto oscuro */
    --text-light: #6B6B6B;       /* Texto claro */
}
```

### Agregar más campos al formulario

Puedes modificar el formulario en `index.html` y actualizar la función `generateWhatsAppMessage()` en `script.js` para incluir campos adicionales como:
- Restricciones alimentarias
- Número de teléfono
- Confirmación de hotel
- Etc.

## 📋 Estructura de archivos

```
wedding-invitation-simple/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidad JavaScript
└── README.md           # Esta documentación
```

## 🛠️ Tecnologías utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos y animaciones
- **Bootstrap 5**: Framework CSS responsivo
- **JavaScript**: Funcionalidad interactiva
- **Font Awesome**: Iconos
- **Google Fonts**: Tipografías elegantes

## 📞 Soporte

Si necesitas ayuda con la configuración o personalización:

1. Revisa la documentación completa
2. Verifica que el número de WhatsApp esté en el formato correcto
3. Asegúrate de que todos los archivos estén en el mismo directorio
4. Prueba la funcionalidad localmente antes de desplegar

## 📄 Licencia

Este proyecto es de uso libre. Puedes modificarlo y distribuirlo según tus necesidades.

---

¡Felicidades por tu boda! 💕


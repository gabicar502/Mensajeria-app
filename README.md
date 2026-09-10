# Sitio web de Mensajeria-app

Sitio estático de tres páginas. No necesita compilarse ni instalar nada: son HTML y CSS.

```
index.html        Portada: servicio, cómo funciona, consentimiento y datos del negocio
privacidad.html   Política de privacidad (Ley 1581 de 2012)
terminos.html     Términos del servicio
estilos.css       Estilos compartidos por las tres páginas
vercel.json       Configuración de Vercel para publicar como sitio estático
.gitignore        Archivos locales que no deben subirse al repositorio
```

## Datos de contacto del sitio

Ya están puestos en las tres páginas:

- Nombre del negocio: **Mensajeria-app**
- Correo de contacto: **gabicar502@gmail.com**
- Direccion: KR 1 C 14 85, Piso 2 Apto 201 - Florencia, Caqueta 180001, Colombia
- Telefono: +57 302 592 9228

Estos datos **deben coincidir con los del portfolio comercial de Meta**. Si cambias uno alli,
cambialo tambien aqui: una inconsistencia entre la web y el portfolio es una senal negativa
para el revisor.

Cuando tengas un correo de tu propio dominio, sustituye `gabicar502@gmail.com` en los tres
archivos HTML: pesa mas a favor en la verificacion que uno de Gmail.

## Repositorio en GitHub

Repositorio configurado para este proyecto:

```text
https://github.com/gabicar502/Mensajeria-app
```

La rama principal debe ser `main`.

## Publicar en Vercel

### Opción A — arrastrar la carpeta (lo más rápido)

1. Entra en [vercel.com/new](https://vercel.com/new)
2. Arrastra esta carpeta completa a la zona de subida
3. Vercel detecta que es un sitio estático y publica sin más configuración
4. Te da una URL del tipo `https://mensajeria-app.vercel.app`

### Opción B — desde GitHub

1. Entra en [vercel.com/new](https://vercel.com/new)
2. Elige **Import Git Repository**
3. Selecciona `gabicar502/Mensajeria-app`
4. Usa esta configuración:

```text
Framework Preset: Other
Root Directory: ./
Build Command: dejar vacío
Output Directory: dejar vacío
Install Command: dejar vacío
Environment Variables: ninguna
```

5. Pulsa **Deploy**

Cada `git push` republicará el sitio.

El archivo `vercel.json` activa URLs limpias, así que Vercel podrá servir tanto `/privacidad` como
`/privacidad.html`.

### Con dominio propio

En Vercel: *Settings → Domains → Add*, y sigue las instrucciones de DNS. Para la verificación de Meta,
un dominio propio es preferible a un subdominio de `vercel.app`.

## Comprobar antes de dar la URL a Meta

- [ ] Abre la web y confirma que el nombre del negocio se lee sin buscarlo
- [ ] El correo de contacto es real y lo revisas
- [ ] La dirección y el teléfono coinciden con el portfolio de Meta
- [ ] La política de privacidad abre y menciona WhatsApp y el consentimiento
- [ ] Se ve bien en el móvil

## Detalles técnicos

Sin dependencias ni JavaScript. Las tipografías (Archivo, Public Sans, JetBrains Mono) se cargan de Google Fonts
y tienen alternativas del sistema declaradas, así que el sitio se lee igual si no cargan.

Modo claro y oscuro según la preferencia del navegador.

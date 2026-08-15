---
title: "UT3 · Guía profesora"
description: "4 sesiones · SSH y diagnóstico"
---

# 🧑‍🏫 UT3 · Guía profesora


!!! info "Marco fijo"
    - **4 horas semanales**: 2 h lunes + 2 h martes.
    - Lunes: autónomo, guiado por el tema.
    - Martes: práctica → preguntas → teoría → consolidación.
    - Nivel: **2.º ASIR / CFGS**.
    - El reto debe exigir interpretación, no solo reproducir pasos.


## Sesiones

| Fecha | Enfoque |
|---|---|
| Mar 03/11 | SSH |
| Lun 09/11 | claves |
| Mar 10/11 | SCP + servicio/configuración |
| Lun 16/11 | reto diagnóstico |

## Nivel mínimo

No basta con:

```text
ssh funciona
scp funciona
```

Deben poder distinguir:

```text
problema de red
problema de servicio
problema de usuario
problema de clave
problema de permisos
problema de ruta
```

## Tu chuleta

```powershell
ssh usuario@IP
ssh-keygen
scp origen usuario@IP:/ruta/
```

```bash
systemctl status ssh
```

Conceptos:

```text
authorized_keys
sshd_config
clave pública
clave privada
```

## Reto

Introduce una incidencia.

La entrega debe incluir:

```text
síntoma → hipótesis → prueba → resultado → solución
```

Eso eleva el nivel sin aumentar demasiado el contenido.

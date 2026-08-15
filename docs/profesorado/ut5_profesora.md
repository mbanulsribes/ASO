---
title: "UT5 · Guía profesora"
description: "Samba e integración Windows/Linux · 8 horas"
---

# 🧑‍🏫 UT5 · Samba


!!! info "Marco metodológico fijo"
    - Nivel: **2.º ASIR / CFGS**.
    - Carga: **4 h semanales**: 2 h lunes + 2 h martes.
    - **Lunes:** sesión autónoma, autocontenida y con preparación docente mínima.
    - **Martes:** práctica → preguntas → teoría → consolidación.
    - El reto final debe medir **autonomía, diagnóstico y justificación**, no reproducción mecánica de una receta.


## Idea que debe quedar

```text
acceso SMB =
configuración Samba
+ autenticación
+ permisos Linux
```

El borrador original ya identificaba los permisos como el principal foco de incidencias. fileciteturn1file0L35-L42

## Cambio respecto al borrador

No uses:

```bash
chmod 777
```

como desbloqueo habitual.

Puedes enseñarlo únicamente para preguntar:

> «¿Por qué esto hace que parezca funcionar y por qué es una mala solución?»

## Sesión 1 · Lun 25/01

**Preparación: 0–10 min.**

Ellos:

```bash
apt install samba
systemctl status smbd
cp smb.conf smb.conf.bak
testparm
```

y crean un share sencillo.

## Sesión 2 · Mar 26/01

Empieza con un `Access denied`.

En pizarra:

```text
Linux FS
   +
Samba
   =
resultado
```

Tu chuleta:

```bash
ls -ld
chown
chgrp
chmod
testparm
systemctl restart smbd
```

## Sesión 3 · Lun 01/02

Autónoma: usuario Samba + recurso restringido.

## Sesión 4 · Mar 02/02

Reto integrado.

### Diagnóstico guiado

```text
red
servicio
smb.conf
usuario
Samba
permisos Linux
```

## Examen

Puedes integrar UT4 P2 + UT5:

```text
crear share Samba
↓
mapearlo por GPO
```

Esto conserva el caso integrado que ya aparecía en el simulacro original. fileciteturn1file2L162-L168

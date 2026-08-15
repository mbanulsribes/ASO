---
title: "UT5 · Integración Windows/Linux con Samba"
description: "SMB, recursos compartidos, usuarios, permisos y acceso desde Windows"
---

## 🤝 UT5 · Integración de sistemas con Samba


!!! info "Cómo trabajaremos"
    Esta unidad pertenece a **2.º ASIR** y se trabaja con **4 horas semanales**:

    - **Lunes (2 h):** práctica autónoma guiada apoyada en este tema.
    - **Martes (2 h):** práctica o problema inicial → preguntas → teoría → consolidación.

    Las prácticas guiadas sirven para aprender la técnica. El **reto final** exige analizar el problema, tomar decisiones, comprobar el resultado y justificar la solución.


## 1. Qué debes aprender

- comprender el objetivo de SMB;
- explicar el papel de Samba;
- instalar y comprobar el servicio;
- localizar `smb.conf`;
- crear recursos compartidos;
- distinguir permisos Linux de permisos/configuración Samba;
- gestionar usuarios Samba básicos;
- acceder desde Windows;
- mapear recursos;
- diagnosticar errores de acceso.

---

## 📖 2. Integración de sistemas heterogéneos

Una infraestructura real puede contener:

```text
Windows
Linux
macOS
NAS
servidores
clientes
```

Necesitamos protocolos comunes para compartir recursos.

---

## 3. SMB y Samba

**SMB** es un protocolo utilizado para compartir recursos de red, especialmente archivos e impresoras.

**Samba** es una implementación libre del protocolo SMB que permite a sistemas Unix/Linux interoperar con sistemas Windows.

```text
Windows
   │
   │ SMB
   ▼
Ubuntu + Samba
```

---

## 4. Instalación

En Ubuntu:

```bash
sudo apt update
sudo apt install samba
```

Comprobación del servicio:

```bash
systemctl status smbd
```

Archivo principal de configuración:

```text
/etc/samba/smb.conf
```

!!! tip "Antes de editar"
    Crea una copia:

    ```bash
    sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.bak
    ```

---

## 5. Recurso compartido

Ejemplo conceptual:

```ini
[Publico]
    path = /srv/samba/publico
    browseable = yes
    read only = no
```

!!! warning "No copies configuraciones sin entenderlas"
    Cada opción cambia el comportamiento del recurso. En el reto tendrás que justificar las principales.

---

## 6. Dos capas de permisos

Esta es una de las ideas más importantes de la UT.

Para acceder a un fichero compartido deben ser coherentes:

```text
permisos del sistema Linux
            +
configuración/autenticación Samba
            =
acceso efectivo
```

Si Samba permite escribir pero Linux no permite escribir en la carpeta, el acceso fallará.

!!! danger "`chmod 777` no es la solución"
    Dar lectura, escritura y ejecución a todo el mundo puede ocultar el problema, pero elimina el control de acceso.

    En esta asignatura debes aprender a configurar **propietario, grupo y permisos razonables**.

---

## 7. Propietario, grupo y permisos Linux

Herramientas:

```bash
ls -ld /ruta
chown
chgrp
chmod
```

Ejemplo:

```bash
sudo chown root:sambashare /srv/samba/proyectos
sudo chmod 2770 /srv/samba/proyectos
```

El bit SGID en un directorio puede ayudar a que nuevos archivos hereden el grupo del directorio.

!!! note "Nivel CFGS"
    No necesitas diseñar ACL complejas en esta UT, pero sí entender por qué el modelo de permisos Linux condiciona el acceso SMB.

---

## 8. Usuarios Samba

Samba mantiene credenciales para determinados modos de funcionamiento.

Una herramienta habitual:

```bash
sudo smbpasswd -a usuario
```

El usuario debe existir en el sistema cuando se trabaja con este enfoque local.

---

## 9. Validar la configuración

Antes de reiniciar servicios:

```bash
testparm
```

permite comprobar la configuración de Samba.

Después:

```bash
sudo systemctl restart smbd
```

!!! tip "Hábitat profesional"
    **Editar → validar → reiniciar → comprobar.**

No reinicies servicios después de cada cambio sin verificar primero la sintaxis cuando existe una herramienta de validación.

---

## 10. Acceso desde Windows

Ruta UNC:

```text
\\IP_SERVIDOR\Publico
```

o:

```text
\\NOMBRE_SERVIDOR\Publico
```

Podemos mapear el recurso como unidad.

Ejemplo:

```text
Z:
```

---

## 11. Diagnóstico de acceso

Si Windows muestra «Acceso denegado»:

```text
1. ¿hay red?
2. ¿smbd está activo?
3. ¿la ruta compartida existe?
4. ¿smb.conf es válido?
5. ¿el usuario existe?
6. ¿está habilitado en Samba?
7. ¿permisos Linux permiten la operación?
8. ¿la configuración Samba permite la operación?
```

---

## 🟦 Lunes 25/01 · Sesión 1 — Compartir una carpeta

###### Trabajo autónomo

1. Instala Samba.
2. Comprueba `smbd`.
3. Crea:

```text
/srv/samba/publico
```

4. Realiza copia de `smb.conf`.
5. Define un recurso de pruebas.
6. Ejecuta:

```bash
testparm
```

7. Accede desde Windows.

###### Evidencia

Documenta qué comando utilizaste para comprobar:

- servicio;
- configuración;
- permisos.

---

## 🟧 Martes 26/01 · Sesión 2 — Permisos

###### Práctica inicial

Se proporcionará un recurso que:

- puede leerse;
- pero no puede escribirse.

Debes determinar por qué.

###### Preguntas

- ¿es Samba?
- ¿son permisos Linux?
- ¿ambos?

###### Teoría

- propietario;
- grupo;
- `rwx`;
- permisos de directorios;
- autenticación Samba;
- acceso efectivo.

---

## 🟦 Lunes 01/02 · Sesión 3 — Usuarios y acceso controlado

###### Trabajo autónomo

Crea un recurso:

```text
Proyectos
```

que no sea anónimo.

Crea/configura el usuario indicado y comprueba:

```text
usuario autorizado → acceso
otro usuario → acceso denegado
```

No utilices `777`.

---

## 🟧 Martes 02/02 · Sesión 4 — Reto de integración

## 🎯 Reto UT5 · Servidor de archivos Linux para usuarios Windows

###### Escenario

Una organización quiere utilizar Ubuntu como servidor de archivos para clientes Windows.

Debe existir:

```text
Publico
Proyectos
```

######## Requisitos

`Publico`:

- visible desde Windows;
- lectura para los usuarios indicados.

`Proyectos`:

- acceso únicamente al grupo indicado;
- escritura para sus miembros;
- permisos Linux coherentes.

Además:

1. valida `smb.conf`;
2. demuestra acceso correcto;
3. demuestra un acceso rechazado;
4. mapea `Proyectos` como `Z:`;
5. documenta el diagnóstico de una incidencia.

!!! abstract "Tipo examen"
    Podrías recibir un recurso que existe pero devuelve `Access denied`. Tendrás que determinar si falla la autenticación Samba, la configuración del share o los permisos Linux.

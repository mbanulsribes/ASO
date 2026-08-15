---
title: "UT3 · Acceso remoto seguro"
description: "SSH, claves, SCP, configuración y diagnóstico"
---

## 🔐 UT3 · Acceso remoto seguro

!!! info "Carga"
    Esta UT ocupa **4 sesiones de 2 horas**.

## 1. Objetivos

- comprender cliente/servidor;
- utilizar SSH;
- distinguir autenticación por contraseña y por claves;
- generar y proteger pares de claves;
- comprender `authorized_keys`;
- transferir archivos con SCP;
- interpretar errores básicos;
- revisar configuración elemental del servicio SSH.

---

## 📖 2. Administración remota

Los servidores pueden estar físicamente lejos.

```text
Administrador
    │
    │ red
    ▼
Servidor
```

Necesitamos acceso remoto.

---

## 3. Cliente y servidor SSH

```text
Windows                 Ubuntu
cliente SSH ─────────→ servidor SSH
```

El cliente inicia la conexión.

El servidor escucha y acepta conexiones autorizadas.

---

## 4. Conexión SSH

```powershell
ssh usuario@IP
```

Una vez dentro:

```bash
hostname
whoami
pwd
```

Los comandos se ejecutan en el servidor remoto.

---

## 5. Servicio SSH

En Ubuntu, OpenSSH Server proporciona el servicio.

Puedes comprobar su estado con herramientas de `systemd`, por ejemplo:

```bash
systemctl status ssh
```

!!! note "Diagnóstico"
    Si la red funciona pero SSH no conecta, comprueba también el estado del servicio.

---

## 6. Autenticación

###### 6.1 Contraseña

El usuario demuestra su identidad mediante contraseña.

###### 6.2 Claves

```text
clave privada → se protege
clave pública → se instala en el servidor
```

Generación:

```powershell
ssh-keygen
```

---

## 7. `authorized_keys`

En sistemas Unix/Linux:

```text
~/.ssh/authorized_keys
```

contiene claves públicas autorizadas.

!!! danger "Nunca compartas la privada"
    No se entrega, no se sube a Git y no se copia al servidor como si fuera una contraseña.

---

## 8. Permisos

SSH es sensible a determinados permisos de archivos y directorios de claves.

Si una configuración de claves falla, revisa:

- ruta;
- propietario;
- permisos;
- contenido de `authorized_keys`.

No hace falta memorizar todos los permisos exactos sin contexto, pero sí comprender que una clave privada demasiado expuesta es un problema de seguridad.

---

## 9. Identidad del servidor

En la primera conexión aparece normalmente una comprobación de huella.

Su función es ayudarte a detectar si el servidor remoto es realmente el esperado.

!!! warning "No automatices el `yes` mentalmente"
    En un entorno profesional las huellas deben verificarse cuando el riesgo lo requiera.

---

## 10. Configuración básica de SSH

El servicio dispone de configuración propia.

En Linux suele encontrarse en:

```text
/etc/ssh/sshd_config
```

o mediante archivos incluidos desde esa configuración.

No vamos a estudiar todas las directivas.

Sí debes reconocer conceptos como:

- puerto;
- autenticación;
- acceso de determinados usuarios;
- autenticación con claves.

!!! danger "No edites sin copia/snapshot"
    Un error de sintaxis puede dejarte sin acceso remoto.

---

## 11. SCP

```powershell
scp C:\datos\a.txt usuario@IP:/home/usuario/
```

Remoto a local:

```powershell
scp usuario@IP:/home/usuario/a.txt C:\datos\
```

---

## 12. Diagnóstico

Orden:

```text
1 red
2 IP/nombre
3 puerto/servicio
4 usuario
5 autenticación
6 permisos
7 ruta
```

!!! tip "Aísla el problema"
    Si `ping` funciona pero `ssh` no, probablemente debes investigar en una capa superior a la conectividad IP básica.

---

## 🟧 Martes 03/11 · Primera conexión

Práctica:

```powershell
ssh usuario@IP
```

Preguntas:

- cliente;
- servidor;
- dónde se ejecutan los comandos;
- qué datos necesitas.

Teoría:

- SSH;
- servicio;
- sesión remota.

---

## 🟦 Lunes 09/11 · Claves

Trabajo autónomo:

```powershell
ssh-keygen
```

Configura autenticación con clave pública siguiendo el procedimiento del tema.

Evidencia:

- nombres de los archivos generados;
- cuál es pública;
- cuál es privada;
- acceso funcional.

---

## 🟧 Martes 10/11 · SCP y configuración

Práctica inicial:

```powershell
scp ...
```

Teoría:

- SCP;
- rutas;
- permisos;
- `sshd_config`;
- servicio SSH.

Consolidación:

copia en ambos sentidos y comprueba integridad básica del archivo.

---

## 🟦 Lunes 16/11 · Reto profesional

## 🎯 Reto UT3 · Administración remota de un servidor

###### Escenario

Debes preparar un Ubuntu Server para administración remota desde Windows.

###### Requisitos

1. comprobar que el servicio SSH está disponible;
2. acceder por SSH;
3. configurar autenticación mediante clave;
4. transferir un fichero con SCP;
5. documentar dónde se almacena la clave pública autorizada;
6. identificar la configuración principal del servicio;
7. resolver una incidencia propuesta.

###### Incidencias posibles

- IP incorrecta;
- usuario incorrecto;
- servicio detenido;
- ruta inexistente;
- clave pública no instalada;
- problema de permisos.

###### Entrega

No basta con capturas. Incluye diagnóstico:

```text
síntoma
hipótesis
prueba
resultado
solución
```

---

## 📝 Tipo examen

Podrías recibir una máquina en la que SSH no funciona.

Deberás determinar si el problema está en:

```text
red
servicio
usuario
clave
permisos
ruta
```

---

## ✅ Resumen

```text
SSH
cliente
servidor
ssh usuario@host
ssh-keygen
pública
privada
authorized_keys
systemctl status ssh
sshd_config
scp
diagnóstico
```

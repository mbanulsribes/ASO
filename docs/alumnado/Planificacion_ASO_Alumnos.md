---
title: "Administración de Sistemas Operativos"
description: "2.º ASIR · Curso 2026/27 · Guía inicial del módulo"
---

# 🖥️ Administración de Sistemas Operativos

## 2.º ASIR · Curso 2026/27

!!! info "Datos básicos del módulo"
    **Módulo profesional:** Administración de Sistemas Operativos  
    **Código:** 0374  
    **Ciclo:** Técnico Superior en Administración de Sistemas Informáticos en Red  
    **Nivel:** Ciclo Formativo de Grado Superior  
    **Curso:** 2.º ASIR  
    **Carga semanal en nuestro grupo:** **4 horas**

    ```text
    Lunes  → 2 horas
    Martes → 2 horas
    ```

---

# 👋 Bienvenida

En este módulo aprenderemos a **administrar sistemas operativos en un entorno de red**.

No se trata únicamente de aprender comandos de Linux o de Windows.

El objetivo es que seas capaz de enfrentarte a situaciones propias de un administrador de sistemas:

```text
observar
   ↓
comprender el problema
   ↓
elegir una herramienta
   ↓
configurar
   ↓
comprobar
   ↓
diagnosticar
   ↓
documentar
```

Durante el curso trabajaremos sobre un laboratorio con sistemas **Linux y Windows**, utilizando máquinas virtuales y herramientas reales de administración.

!!! success "Objetivo final"
    Al terminar el módulo deberías ser capaz de administrar servicios y sistemas con bastante más autonomía que al principio del curso.

    No esperamos que memorices toda la documentación de un sistema operativo.

    Esperamos que sepas **entender qué necesitas hacer, buscar la herramienta adecuada, utilizarla correctamente y comprobar el resultado**.

---

# 🧭 ¿Qué vamos a aprender?

El módulo gira alrededor de varias áreas de administración:

- servicios de directorio y administración centralizada;
- automatización mediante scripts;
- administración remota;
- procesos, servicios y tareas programadas;
- integración entre sistemas Windows y Linux;
- administración de recursos compartidos;
- servidores de impresión;
- diagnóstico de incidencias;
- herramientas actuales de virtualización y contenedores.

A lo largo del curso utilizaremos, entre otras tecnologías:

```text
Proxmox
Ubuntu Server
Windows Server
Bash
PowerShell
SSH / SCP
Active Directory
GPO
Samba
systemd
cron
CUPS
Docker
Docker Compose
Kubernetes
```

!!! note "Tecnología y currículo"
    No todas estas herramientas constituyen por sí mismas un Resultado de Aprendizaje.

    Algunas, como Proxmox o Docker, nos ayudan a construir un laboratorio moderno y a practicar administración de sistemas.

    La referencia para evaluar el módulo son los **Resultados de Aprendizaje (RA)**.

---

# 🎯 Resultados de Aprendizaje

El módulo profesional **0374 Administración de Sistemas Operativos** se estructura en siete Resultados de Aprendizaje.

## RA1 · Servicio de directorio

> Administra el servicio de directorio interpretando especificaciones e integrándolo en una red.

Trabajaremos, entre otros contenidos:

```text
Active Directory
dominio
controlador de dominio
usuarios
grupos
OU
GPO
autenticación centralizada
DNS asociado a AD
```

---

## RA2 · Procesos

> Administra procesos del sistema describiéndolos y aplicando criterios de seguridad y eficiencia.

Trabajaremos:

```text
procesos
PID
CPU
memoria
top / htop
ps
señales
kill
servicios
systemd
logs
```

---

## RA3 · Automatización de tareas

> Gestiona la automatización de tareas del sistema, aplicando criterios de eficiencia y utilizando comandos y herramientas gráficas.

Trabajaremos:

```text
automatización
scripts
tareas programadas
cron
logs
comprobación de ejecuciones
```

---

## RA4 · Administración remota

> Administra de forma remota el sistema operativo en red valorando su importancia y aplicando criterios de seguridad.

Trabajaremos:

```text
SSH
SCP
cliente / servidor
claves pública y privada
authorized_keys
servicios de acceso remoto
diagnóstico
```

---

## RA5 · Servidores de impresión

> Administra servidores de impresión describiendo sus funciones e integrándolos en una red.

Trabajaremos:

```text
servidor de impresión
colas
trabajos
impresoras lógicas
CUPS
compartición
administración de colas
```

---

## RA6 · Integración de sistemas

> Integra sistemas operativos libres y propietarios, justificando y garantizando su interoperabilidad.

Trabajaremos especialmente:

```text
Windows ↔ Linux
SMB
Samba
usuarios
grupos
permisos
recursos compartidos
acceso desde distintos sistemas
```

---

## RA7 · Lenguajes de guiones

> Utiliza lenguajes de guiones en sistemas operativos, describiendo su aplicación y administrando servicios del sistema operativo.

Utilizaremos principalmente:

```text
Bash
PowerShell
```

para automatizar tareas reales de administración.

---

# 🗺️ Mapa general del curso

La organización por unidades podrá ajustarse durante el curso, pero el recorrido previsto es el siguiente.

## 1.ª evaluación

### UT0 · Laboratorio de administración

```text
Proxmox
Ubuntu Server
Windows Server
red virtual
snapshots
diagnóstico básico
```

Esta unidad prepara el entorno sobre el que trabajaremos durante todo el curso.

### UT1 · Automatización con Bash

```text
scripts
variables
parámetros
if
validación
redirecciones
códigos de salida
automatización
```

**RA relacionados:** RA3 y principalmente RA7.

### UT2 · Administración con PowerShell

```text
cmdlets
objetos
propiedades
pipeline
filtros
scripts
informes
```

**RA relacionados:** principalmente RA7 y algunas evidencias relacionadas con administración de procesos.

### UT3 · Administración remota

```text
SSH
claves
SCP
configuración
seguridad
diagnóstico
```

**RA principal:** RA4.

### UT4 · Active Directory — Parte 1

```text
dominio
controlador de dominio
DNS
usuarios
grupos
OU
privilegios
```

**RA principal:** RA1.

---

# 2.ª evaluación

### UT4 · Active Directory — Parte 2

```text
GPO
ámbito
preferencias
Drive Maps
gpupdate
gpresult
diagnóstico
```

Continúa desarrollando **RA1**.

### UT5 · Integración Windows/Linux

```text
Samba
SMB
permisos Linux
usuarios
grupos
recursos compartidos
Windows ↔ Linux
```

**RA principal:** RA6.

### UT6 · Procesos y servicios

```text
procesos
PID
top
htop
señales
systemd
logs
```

**RA principal:** RA2.

### UT7 · Automatización y tareas programadas

```text
cron
planificación
logs
comprobación
```

**RA principal:** RA3.

### UT de impresión

```text
CUPS
colas
impresoras
trabajos de impresión
compartición
```

**RA principal:** RA5.

### UT8 · Contenedores y orquestación

```text
Docker
imágenes
contenedores
redes
volúmenes
Docker Compose
Kubernetes
```

!!! note "Contenedores"
    Docker y Kubernetes son herramientas relevantes en sistemas actuales y nos permiten ampliar la visión profesional del módulo.

    Se utilizarán como **contenido tecnológico y de ampliación**, sin sustituir los Resultados de Aprendizaje oficiales del módulo.

---

# 🕐 Horario y ritmo semanal

Tenemos **4 horas de clase por semana**.

## 🟦 Lunes · 2 horas

El lunes será habitualmente una sesión de **trabajo autónomo guiado**.

El tema estará preparado para que puedas avanzar siguiendo el material.

La estructura habitual será:

```text
situación
    ↓
lectura breve
    ↓
práctica guiada
    ↓
experimentación
    ↓
preguntas
    ↓
evidencia
```

### ¿Por qué trabajaremos así?

En administración de sistemas se aprende mucho cuando primero tienes que:

- probar;
- observar;
- equivocarte;
- investigar;
- comparar resultados.

!!! info "El lunes no es una hora libre"
    Trabajo autónomo significa que **tú eres responsable de avanzar**.

    Habrá una tarea concreta y normalmente deberás dejar una evidencia de lo realizado.

---

# 🟧 Martes · 2 horas

El martes utilizaremos un modelo parecido a una **flipped classroom práctica**.

No comenzaremos normalmente con una explicación teórica larga.

Empezaremos por un problema.

```text
PRÁCTICA / PROBLEMA
        ↓
¿QUÉ HA PASADO?
        ↓
PREGUNTAS
        ↓
TEORÍA
        ↓
CONSOLIDACIÓN
```

## Ejemplo

En lugar de empezar diciendo:

> «Hoy vamos a estudiar permisos de Samba.»

podríamos empezar con:

> «Puedes abrir la carpeta compartida desde Windows, pero no puedes crear un fichero. ¿Por qué?»

Después de intentar diagnosticarlo estudiaremos:

- permisos Linux;
- propietario;
- grupo;
- configuración Samba;
- acceso efectivo.

!!! tip "La teoría importa"
    Que la teoría aparezca después de la práctica **no significa que sea opcional**.

    El tema escrito contiene la teoría que necesitas para:

    - comprender lo realizado;
    - resolver problemas diferentes;
    - preparar los retos;
    - preparar el examen.

---

# 📚 Los temas funcionan como un libro

Todos los contenidos estarán disponibles en estos apuntes.

Encontrarás diferentes tipos de notas.

!!! info "Concepto importante"
    Ideas que debes comprender.

!!! example "Ejemplo"
    Aplicación de la teoría a una situación concreta.

!!! tip "Como administrador"
    Buenas prácticas, métodos de trabajo o trucos útiles.

!!! warning "Error frecuente"
    Algo que suele provocar fallos.

!!! danger "Atención"
    Errores que pueden afectar a seguridad, datos o funcionamiento del sistema.

!!! question "Comprueba que lo entiendes"
    Preguntas para detectar si realmente comprendes el concepto.

!!! abstract "Para el examen"
    Conocimientos o procedimientos especialmente importantes.

---

# 🧪 Prácticas y retos

No todas las actividades tendrán el mismo nivel de ayuda.

## Nivel 1 · Práctica guiada

El procedimiento está bastante indicado.

Objetivo:

```text
aprender una herramienta nueva
```

## Nivel 2 · Práctica semiguiada

Conoces las herramientas, pero debes completar parte del procedimiento.

Objetivo:

```text
aplicar
```

## Nivel 3 · Reto profesional

Recibirás principalmente:

```text
situación
+
requisitos
```

Tendrás que decidir el procedimiento.

Objetivo:

```text
analizar
→ decidir
→ implementar
→ comprobar
→ justificar
```

!!! example "Ejemplo de diferencia"
    **Práctica guiada:**

    > Ejecuta `systemctl status ssh`.

    **Reto:**

    > El servidor responde a `ping`, pero no puedes entrar por SSH. Diagnostica la incidencia.

El segundo problema exige que decidas **qué herramienta utilizar y por qué**.

---

# 🔧 Método de diagnóstico

Una de las competencias más importantes del módulo será aprender a diagnosticar.

Cuando algo no funciona no utilizaremos como método:

```text
cambiar cosas hasta que funcione
```

Intentaremos trabajar así:

```text
SÍNTOMA
   ↓
HIPÓTESIS
   ↓
PRUEBA
   ↓
RESULTADO
   ↓
SOLUCIÓN
   ↓
COMPROBACIÓN
```

!!! tip "Regla"
    Cambia una cosa cada vez.

    Si cambias cinco configuraciones simultáneamente y de repente funciona, probablemente no has aprendido cuál era el problema.

---

# 📝 Evaluación

Los exámenes serán fundamentalmente **prácticos y aplicados**.

No consistirán únicamente en repetir exactamente los retos realizados en clase.

Podrás encontrarte:

- una configuración incompleta;
- una configuración incorrecta;
- un servicio que no funciona;
- un script que debe adaptarse;
- datos que debes interpretar;
- una decisión que debes justificar.

!!! success "Pero no habrá contenidos sorpresa"
    Todo procedimiento o concepto necesario para resolver el examen deberá haber sido:

    ```text
    explicado
    +
    visto
    +
    practicado
    ```

La dificultad estará en **utilizar lo aprendido en una situación ligeramente diferente**, no en adivinar algo que nunca hemos trabajado.

---

# 🎯 Evaluación por Resultados de Aprendizaje

Las unidades nos ayudan a organizar el curso, pero la referencia de evaluación son los **RA**.

Por eso una misma actividad puede proporcionar evidencia de varios resultados.

Ejemplo:

```text
script Bash que automatiza altas
         │
         ├── RA7 · scripting
         └── RA3 · automatización
```

Otro ejemplo:

```text
recurso Samba Linux accesible desde Windows
         │
         └── RA6 · integración de sistemas
```

!!! info "Importante"
    Aprobar una actividad no significa necesariamente haber demostrado todos los RA del módulo.

    A lo largo del curso iremos recogiendo evidencias de cada resultado.

---

# 🧠 ¿Qué se espera de ti?

## 1. Autonomía progresiva

Al principio habrá mucha guía.

Al final deberías necesitar menos.

```text
inicio del curso        final del curso

mucha guía  ───────────────→  mayor autonomía
```

## 2. Comprender, no copiar

Puedes utilizar documentación y ayuda cuando esté permitido.

Pero copiar un comando sin saber qué hace tiene poco valor en administración de sistemas.

Debes intentar poder responder:

```text
¿Qué hace?
¿Por qué lo utilizo?
¿Cómo sé que ha funcionado?
¿Qué comprobaría si falla?
```

## 3. Comprobar siempre

No basta con ejecutar:

```bash
sudo systemctl restart smbd
```

Después debes comprobar.

Por ejemplo:

```bash
systemctl status smbd
```

## 4. Documentar

Un administrador no solo arregla problemas.

También debe dejar información que otra persona pueda entender.

En algunas actividades utilizaremos estructuras como:

```text
problema:
causa:
prueba realizada:
solución:
comprobación:
```

## 5. Seguridad antes que atajos

Durante el curso veremos soluciones que técnicamente pueden «hacer que funcione» pero son malas prácticas.

Ejemplos:

```bash
chmod 777
kill -9
```

o conceder privilegios administrativos a todo el mundo.

!!! danger "Que funcione no significa que esté bien"
    En un ciclo superior también evaluaremos **la calidad de la decisión técnica**.

---

# 💻 Nuestro laboratorio

Trabajaremos principalmente con:

```text
Proxmox
├── Ubuntu Server
└── Windows Server
```

Estas máquinas evolucionarán durante el curso.

Por eso será importante utilizar:

- snapshots;
- nombres claros;
- configuraciones ordenadas;
- copias cuando proceda;
- documentación.

!!! warning "Cuida tu laboratorio"
    Tus máquinas son tu herramienta de trabajo.

    No esperes al día del examen para descubrir que una VM lleva tres semanas sin arrancar.

---

# 🆘 ¿Qué hago cuando no sé seguir?

Antes de preguntar simplemente:

> «No funciona.»

intenta aportar información.

## Buena pregunta

```text
Estoy configurando SSH.
El ping funciona.
ssh usuario@192.168.10.20 devuelve Connection refused.
He comprobado la IP.
No sé qué revisar después.
```

Eso permite diagnosticar.

## Mala pregunta

```text
No va.
```

---

# 🔍 Herramientas de ayuda

Aprenderemos también a consultar ayuda.

Linux:

```bash
comando --help
man comando
```

PowerShell:

```powershell
Get-Help Comando
Get-Help Comando -Examples
Get-Command
```

Docker:

```bash
docker COMANDO --help
```

Kubernetes:

```bash
kubectl ... --help
```

!!! tip "No memorices Internet"
    Un profesional no conoce todos los comandos de memoria.

    Sabe **qué busca y cómo localizar información fiable**.

---

# 🧩 Visión global

Al final del módulo deberías poder mirar una infraestructura sencilla como:

```text
                 ACTIVE DIRECTORY
                        │
                 usuarios / grupos
                        │
          ┌─────────────┴─────────────┐
          │                           │
       Windows                      Linux
          │                           │
          ├────── SMB / Samba ────────┤
          │                           │
          └────── SSH / SCP ──────────┘
                                      │
                               procesos / cron
                                      │
                                    Docker
```

y entender qué función desempeña cada elemento.

---

# 🚀 Empezamos

No necesitas llegar al módulo sabiendo administrar todos estos sistemas.

Sí necesitarás:

- trabajar cada semana;
- mantener tu laboratorio operativo;
- leer los temas;
- probar;
- equivocarte;
- preguntar;
- documentar;
- y, sobre todo, **entender lo que haces**.

!!! success "La meta"
    Pasar de:

    > «Dime qué comando tengo que poner.»

    a:

    > «Este es el problema, estas son mis hipótesis y voy a comprobarlas.»

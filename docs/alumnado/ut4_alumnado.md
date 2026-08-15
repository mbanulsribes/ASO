---
title: "UT4 · Active Directory (parte 1)"
description: "AD DS, dominios, DC, DNS, objetos, OU, usuarios y grupos"
---

## 🏢 UT4 · Active Directory — Parte 1

!!! info "Carga"
    Esta UT ocupa **4 sesiones de 2 horas** en la 1.ª evaluación.

    Las GPO avanzadas se dejan para la 2.ª evaluación.

## 1. Objetivos

Al terminar podrás:

- explicar qué problema resuelve un servicio de directorio;
- distinguir cuenta local y de dominio;
- definir dominio, bosque y DC;
- comprender por qué DNS es esencial para AD;
- instalar AD DS;
- promocionar un servidor;
- crear usuarios, grupos y OU;
- aplicar una estructura administrativa sencilla;
- razonar sobre privilegios.

---

## 📖 2. Servicio de directorio

Un directorio almacena información estructurada sobre objetos.

Ejemplos:

```text
usuarios
grupos
equipos
impresoras
recursos
```

Active Directory Domain Services proporciona un servicio de directorio para entornos Windows.

---

## 3. Cuenta local y de dominio

###### Local

```text
PC-A
└── ana
```

Existe en un equipo concreto.

###### Dominio

```text
aso.local
└── ana
```

La identidad pertenece al dominio.

---

## 4. Dominio

Un dominio agrupa objetos bajo una infraestructura administrativa común.

```text
aso.local
├── usuarios
├── grupos
├── equipos
└── OU
```

---

## 5. Controlador de dominio

Un DC ejecuta AD DS y presta servicios esenciales al dominio.

Entre otras funciones:

- autenticación;
- acceso al directorio;
- localización de servicios;
- replicación cuando hay varios DC.

En nuestro laboratorio trabajaremos con un único DC.

---

## 6. Bosque

El bosque es la estructura superior.

```text
Bosque
└── aso.local
```

No estudiaremos arquitecturas multidominio en esta parte.

---

## 7. DNS y Active Directory

AD DS depende de DNS para localizar controladores y servicios.

!!! info "Idea esencial"
    En un dominio, DNS no es un accesorio. Forma parte del funcionamiento de Active Directory.

No estudiaremos DNS de forma completa aquí, pero sí debes comprender esta dependencia.

---

## 8. Instalar AD DS y promocionar

Son dos fases:

```text
1. instalar rol AD DS
2. promocionar a DC
```

Instalar el rol no crea automáticamente el dominio.

---

## 9. Objetos y atributos

Un usuario es un objeto con atributos.

```text
usuario
├── nombre
├── identificador
├── credenciales
├── pertenencia a grupos
└── otros atributos
```

---

## 10. Organizational Units (OU)

Las **OU** permiten organizar objetos de forma administrativa.

Ejemplo:

```text
aso.local
├── OU=Alumnos
├── OU=Profesorado
└── OU=Equipos
```

!!! note "OU ≠ grupo"
    Una OU organiza objetos y sirve como ámbito administrativo/políticas.

    Un grupo agrupa identidades principalmente para facilitar asignación de permisos y otros usos.

---

## 11. Usuarios y grupos

En lugar de asignar permisos uno a uno:

```text
usuarios → grupos → permisos
```

es una estrategia más escalable.

Ejemplo:

```text
Grupo: Sistemas
├── ana
├── luis
└── marta
```

---

## 12. Privilegios

Grupos como `Domain Admins` tienen privilegios elevados.

!!! danger "Principio de mínimo privilegio"
    Un usuario no debería recibir más privilegios de los necesarios.

En laboratorio podemos utilizar grupos administrativos para comprender su efecto, pero debemos reconocer el riesgo.

---

## 13. Autenticación y autorización

###### Autenticación

```text
¿Quién eres?
```

###### Autorización

```text
¿Qué puedes hacer?
```

Son procesos diferentes.

---

## 🟧 Martes 17/11 · Problema y teoría

Práctica inicial:

Diseña en papel cómo administrarías:

```text
200 usuarios
150 PCs
3 departamentos
```

Preguntas:

- ¿usuarios locales o centralizados?
- ¿cómo agruparías departamentos?
- ¿cómo aplicarías permisos?

Teoría:

- directorio;
- dominio;
- DC;
- bosque;
- DNS;
- OU;
- grupos.

Crear snapshot:

```text
01-antes-AD
```

---

## 🟦 Lunes 23/11 · Instalar AD DS

Trabajo autónomo:

```text
Server Manager
→ Add Roles and Features
→ Active Directory Domain Services
```

Evidencia:

- rol instalado;
- diferencia entre instalar y promocionar;
- snapshot disponible.

---

## 🟧 Martes 24/11 · Promocionar

Práctica inicial:

crear:

```text
nuevo bosque
aso.local
```

Después:

- reinicio;
- comprobar herramientas;
- revisar DNS asociado.

Teoría:

- bosque;
- dominio;
- DC;
- DNS;
- autenticación.

---

## 🟦 Lunes 30/11 · Reto profesional

## 🎯 Reto UT4 · Estructura de una pequeña empresa

###### Escenario

La empresa **AulaNet** tiene:

- Dirección;
- Sistemas;
- Administración;
- 12 usuarios;
- varios equipos.

###### Debes

1. crear una estructura de OU razonable;
2. crear usuarios;
3. crear grupos por función;
4. asignar usuarios a grupos;
5. crear un usuario de administración delegada;
6. justificar qué cuentas deben tener privilegios elevados y cuáles no;
7. documentar la estructura.

Ejemplo de documentación:

```text
OU
├── Usuarios
│   ├── Dirección
│   ├── Sistemas
│   └── Administración
└── Equipos
```

!!! warning "No hay una única estructura válida"
    Se evalúa que la propuesta sea coherente, justificable y administrable.

###### Ampliación

Explica qué cambiaría si la empresa creciera a 500 usuarios.

---

## 📝 Tipo examen

Podrías recibir un escenario empresarial y tener que:

- decidir OU;
- crear usuarios;
- crear grupos;
- justificar pertenencias;
- explicar por qué un usuario no debe ser `Domain Admin`.

---

## ✅ Resumen

```text
AD DS
directorio
dominio
bosque
DC
DNS
objeto
atributo
OU
usuario
grupo
autenticación
autorización
mínimo privilegio
```

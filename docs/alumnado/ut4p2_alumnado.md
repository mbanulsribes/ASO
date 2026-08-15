---
title: "UT4 P2 · GPO y administración centralizada"
description: "Unidades organizativas, GPO, preferencias, aplicación y diagnóstico"
---

## 🏢 UT4 · Parte 2 — GPO y administración centralizada


!!! info "Cómo trabajaremos"
    Esta unidad pertenece a **2.º ASIR** y se trabaja con **4 horas semanales**:

    - **Lunes (2 h):** práctica autónoma guiada apoyada en este tema.
    - **Martes (2 h):** práctica o problema inicial → preguntas → teoría → consolidación.

    Las prácticas guiadas sirven para aprender la técnica. El **reto final** exige analizar el problema, tomar decisiones, comprobar el resultado y justificar la solución.


## 1. Qué debes aprender

Al terminar podrás:

- diferenciar una **OU** de un grupo;
- explicar qué es un **GPO**;
- comprender el vínculo entre GPO y contenedores/OU;
- distinguir configuración de **usuario** y de **equipo**;
- aplicar restricciones sencillas;
- utilizar **Group Policy Preferences**;
- mapear unidades de red;
- forzar y comprobar actualización de políticas;
- realizar diagnóstico básico cuando una GPO no se aplica.

---

## 📖 2. ¿Por qué necesitamos políticas?

En una red con muchos equipos, configurar cada ordenador manualmente no escala.

Imagina:

```text
150 equipos
150 usuarios
```

Queremos, por ejemplo:

- configurar restricciones;
- distribuir configuraciones;
- mapear recursos;
- estandarizar el entorno.

La administración centralizada permite definir una configuración una vez y aplicarla al ámbito adecuado.

---

## 3. OU y grupos no son lo mismo

Una **Organizational Unit (OU)** organiza objetos dentro de Active Directory y puede utilizarse como ámbito de administración y de aplicación de políticas.

Un **grupo** se utiliza principalmente para agrupar identidades con fines como permisos y autorización.

```text
OU=Alumnos
├── ana
├── luis
└── marta

Grupo=AccesoBiblioteca
├── ana
└── marta
```

!!! warning "Error frecuente"
    No diseñes las OU como si fueran simplemente grupos de permisos.

---

## 4. ¿Qué es un GPO?

Un **Group Policy Object** contiene configuraciones que pueden aplicarse a usuarios y/o equipos dentro de Active Directory.

Conceptualmente:

```text
GPO
├── Computer Configuration
└── User Configuration
```

Un GPO debe estar **vinculado** a un ámbito adecuado para que pueda aplicarse.

!!! info "Idea clave"
    Crear una GPO no significa automáticamente que esté afectando a todos los usuarios.

---

## 5. Configuración de equipo y de usuario

###### Equipo

Afecta al ordenador.

Ejemplos:

- determinados parámetros de seguridad;
- configuraciones del sistema;
- scripts de inicio/apagado.

###### Usuario

Afecta a la sesión del usuario.

Ejemplos:

- restricciones de interfaz;
- determinadas preferencias;
- mapeo de unidades.

Pregunta:

> Si queremos que una unidad `Z:` aparezca para determinados usuarios, ¿tiene más sentido empezar pensando en usuario o en equipo?

---

## 6. Políticas y preferencias

En Group Policy encontramos **Policies** y **Preferences**.

Las preferencias permiten configurar elementos como:

- unidades de red;
- variables de entorno;
- accesos directos;
- determinados ajustes de archivos/registro.

Microsoft documenta específicamente **Drive Maps** dentro de Group Policy Preferences.

---

## 7. Mapeo de una unidad de red

Supongamos que existe:

```text
\\SERVIDOR\Publico
```

y queremos asignarlo como:

```text
Z:
```

La configuración se realiza desde las preferencias de usuario de la GPO.

Conceptualmente:

```text
Usuario inicia sesión
        ↓
se procesa GPO
        ↓
se crea mapeo
        ↓
Z: → \\SERVIDOR\Publico
```

!!! note "La red debe existir antes"
    Una GPO no arregla una ruta SMB incorrecta ni permisos insuficientes.

---

## 8. Actualización de políticas

Para solicitar una actualización:

```powershell
gpupdate /force
```

Después podemos comprobar qué políticas han afectado al sistema utilizando herramientas como:

```powershell
gpresult /r
```

!!! tip "Diagnóstico"
    `gpupdate /force` no sustituye el diagnóstico. Si la GPO sigue sin aplicarse, investiga **ámbito, vínculo, usuario/equipo, conectividad y permisos**.

---

## 9. Orden de diagnóstico

Si una política no se aplica:

```text
1. ¿El cliente pertenece al dominio?
2. ¿El usuario/equipo está en la OU esperada?
3. ¿La GPO está creada?
4. ¿Está vinculada al lugar correcto?
5. ¿La configuración está en User o Computer?
6. ¿La GPO está habilitada?
7. ¿Se ha actualizado la política?
8. ¿gpresult muestra la GPO?
9. ¿El recurso final existe y es accesible?
```

---

## 10. Buena práctica: no tocar todo en Default Domain Policy

En laboratorio es tentador editar la política predeterminada para que «funcione para todos».

!!! warning "Mejor práctica"
    Para las actividades de clase crea **GPO específicas con nombres descriptivos** y enlázalas al ámbito correspondiente.

Por ejemplo:

```text
GPO_BloquearPanel_Alumnos
GPO_MapearPublico_Directivos
```

Así es más sencillo:

- entender qué hace cada política;
- probarla;
- retirarla;
- diagnosticarla.

---

## 🟦 Lunes 11/01 · Sesión 1 — Explorar OU y GPO

###### Trabajo autónomo

1. Comprueba que `aso.local` funciona.
2. Crea una OU de laboratorio:
   `PruebasGPO`.
3. Crea un usuario dentro.
4. Abre la consola de administración de directivas.
5. Crea una GPO:
   `GPO_Prueba`.
6. **No configures todavía nada complejo.**
7. Identifica:
   - vínculo;
   - configuración de usuario;
   - configuración de equipo.

###### Evidencia

Explica en tus palabras:

- OU;
- grupo;
- GPO;
- vínculo.

---

## 🟧 Martes 12/01 · Sesión 2 — Aplicar una política

###### Práctica inicial

Configura una restricción sencilla sobre el usuario de pruebas.

Ejemplo de objetivo:

> impedir el acceso al Panel de control/Configuración en el ámbito indicado por la profesora.

Después:

```powershell
gpupdate /force
```

###### Preguntas

- ¿por qué no se aplica a todos?
- ¿qué objeto recibe la política?
- ¿es una configuración de usuario o de equipo?

###### Teoría

Formalizamos:

- procesamiento;
- ámbito;
- vínculo;
- usuario/equipo;
- herencia a nivel introductorio.

---

## 🟦 Lunes 18/01 · Sesión 3 — Preferencias y unidades

###### Situación

La empresa tiene una carpeta compartida y quiere que determinados usuarios vean automáticamente:

```text
Z:
```

Explora:

```text
User Configuration
→ Preferences
→ Windows Settings
→ Drive Maps
```

Crea un mapeo de prueba hacia una ruta proporcionada.

###### Preguntas

1. ¿La ruta existe?
2. ¿El usuario tiene permisos?
3. ¿La unidad aparece?
4. ¿Qué ocurre si el servidor no está disponible?

---

## 🟧 Martes 19/01 · Sesión 4 — Reto y diagnóstico

## 🎯 Reto UT4 P2 · Política para departamentos

###### Escenario

La empresa tiene:

```text
OU=Directivos
OU=Alumnos
```

Requisitos:

1. los usuarios de `Directivos` deben recibir automáticamente una unidad `Z:` hacia un recurso compartido;
2. los usuarios de `Alumnos` deben recibir una restricción indicada;
3. las políticas no deben afectar al resto del dominio;
4. debes comprobar la aplicación;
5. debes diagnosticar una incidencia preparada por la profesora.

###### Entrega

```text
diseño
GPO creadas
ámbito
prueba
gpresult
incidencia
diagnóstico
solución
```

!!! abstract "Tipo examen"
    Puedes recibir un dominio ya preparado y tener que aplicar una configuración **solo a una OU concreta**, además de justificar por qué una GPO no se está aplicando.

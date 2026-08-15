---
title: "UT2 · Administración con PowerShell"
description: "Objetos, pipeline, filtrado, scripts e informes"
---

## 🪟 UT2 · Administración con PowerShell

!!! info "Carga"
    Esta UT ocupa **5 sesiones de 2 horas**.

## 1. Objetivos

Al terminar podrás:

- usar la ayuda y descubrimiento de PowerShell;
- comprender cmdlets y objetos;
- inspeccionar propiedades;
- construir pipelines;
- filtrar, ordenar y seleccionar;
- diferenciar datos de formato;
- almacenar objetos en variables;
- crear scripts `.ps1`;
- exportar informes;
- resolver pequeñas tareas de administración.

---

## 📖 2. Cmdlets

Los cmdlets suelen usar:

```text
Verbo-Sustantivo
```

Ejemplos:

```powershell
Get-Process
Get-Service
Start-Service
Stop-Process
Export-Csv
```

###### 2.1 Ayuda

```powershell
Get-Help Get-Service -Examples
Get-Command *Service*
```

!!! tip "Competencia real"
    No memorices todos los cmdlets. Aprende a descubrirlos y consultar su ayuda.

---

## 3. PowerShell trabaja con objetos

```powershell
Get-Service
```

devuelve objetos.

Cada objeto dispone de propiedades.

Puedes inspeccionarlo:

```powershell
Get-Service | Get-Member
```

---

## 4. Pipeline

```text
|
```

pasa objetos de un comando a otro.

```powershell
Get-Service |
Where-Object {$_.Status -eq "Stopped"}
```

`$_` representa el objeto actual.

---

## 5. Filtrado

```powershell
Where-Object {$_.CPU -gt 10}
```

Operadores:

```text
-eq  igual
-ne  distinto
-gt  mayor
-lt  menor
-ge  mayor o igual
-le  menor o igual
```

---

## 6. Ordenar y seleccionar

```powershell
Get-Process |
Sort-Object WorkingSet -Descending |
Select-Object -First 5
```

Razonamiento:

```text
obtener → ordenar → seleccionar
```

---

## 7. Selección de propiedades

```powershell
Get-Process |
Select-Object Name, Id, CPU
```

!!! note "Objeto ≠ lo que ves en pantalla"
    La tabla mostrada es una representación. El objeto puede contener muchas más propiedades.

---

## 8. Variables

```powershell
$procesos = Get-Process
```

Una variable puede contener uno o muchos objetos.

---

## 9. Scripts `.ps1`

```powershell
$detenidos = Get-Service |
    Where-Object {$_.Status -eq "Stopped"}

$detenidos
```

###### 9.1 Parámetros sencillos

Podemos definir parámetros:

```powershell
param(
    [string]$RutaSalida
)
```

Esto permite reutilizar el script.

!!! info "Nivel CFGS"
    No necesitas crear módulos PowerShell todavía, pero sí comprender que los scripts pueden recibir parámetros y producir resultados reutilizables.

---

## 10. Exportar información

```powershell
Get-Process |
Select-Object Name, Id, CPU |
Export-Csv C:\informes\procesos.csv -NoTypeInformation
```

El CSV conserva datos tabulares.

---

## 11. Formato frente a datos

PowerShell distingue entre **seleccionar datos** y **formatear la salida**.

Ejemplo:

```powershell
Get-Process | Select-Object Name, CPU
```

conserva objetos con determinadas propiedades.

En cambio:

```powershell
Get-Process | Format-Table Name, CPU
```

está pensado para presentación.

!!! warning "Error clásico"
    Evita introducir `Format-Table` en mitad de un pipeline si después necesitas seguir procesando/exportando datos.

---

## 12. Servicios

Ejemplo:

```powershell
Get-Service |
Where-Object {$_.Status -eq "Stopped"}
```

Si además queremos considerar el tipo de inicio, necesitaremos consultar propiedades disponibles o herramientas adecuadas.

La idea de administración es:

```text
obtener información
filtrar
tomar decisión
actuar
comprobar
```

---

## 🟦 Lunes 19/10 · Descubrir PowerShell

Trabajo autónomo:

```powershell
Get-Process
Get-Service
Get-Date
Get-Command
Get-Help Get-Service -Examples
```

Evidencia:

- encuentra un cmdlet que no conocías;
- explica cómo lo has localizado;
- muestra un ejemplo obtenido con `Get-Help`.

---

## 🟧 Martes 20/10 · Objetos y pipeline

Práctica inicial:

```powershell
Get-Service | Get-Member
```

Después:

```powershell
Get-Service |
Where-Object {$_.Status -eq "Running"}
```

Teoría:

- objeto;
- propiedad;
- pipeline;
- `$_`;
- comparación.

Consolidación:

obtén servicios detenidos y muestra solo `Name` y `Status`.

---

## 🟦 Lunes 26/10 · Filtrar y ordenar

Trabajo:

1. cinco procesos con más memoria;
2. procesos con CPU superior a un valor;
3. servicios detenidos.

Debes justificar el orden lógico del pipeline.

---

## 🟧 Martes 27/10 · Scripts e informes

Práctica inicial:

genera un informe CSV de procesos.

Teoría:

- variables;
- `.ps1`;
- parámetros;
- `Export-Csv`;
- datos vs formato.

Consolidación:

script que recibe ruta de salida.

---

## 🟦 Lunes 02/11 · Reto profesional

## 🎯 Reto UT2 · Informe de estado del servidor

###### Escenario

El responsable de sistemas quiere un informe automático antes de realizar mantenimiento.

###### El script debe

1. obtener los 10 procesos con mayor consumo de memoria;
2. mostrar nombre, PID y memoria;
3. obtener los servicios detenidos;
4. guardar ambos resultados en archivos CSV;
5. recibir por parámetro la carpeta de salida;
6. crear la carpeta si no existe;
7. mostrar un resumen final.

###### Ampliación

Identifica servicios detenidos y analiza cuáles deberían estar iniciados antes de actuar.

!!! warning "Administración responsable"
    No se debe iniciar indiscriminadamente todo servicio detenido. Un servicio puede estar detenido porque así está diseñado.

---

## 📝 Tipo examen

Posible ejercicio:

> Lista servicios detenidos y, solo sobre el conjunto obtenido, ejecuta una acción indicada.

La solución deberá mostrar dominio del pipeline.

---

## ✅ Resumen

Debes dominar:

```text
Get-Command
Get-Help
objetos
propiedades
Get-Member
|
$_
Where-Object
Sort-Object
Select-Object
variables
.ps1
param()
Export-Csv
```

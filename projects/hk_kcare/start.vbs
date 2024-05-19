Dim WshShell, filePath
Set WshShell = CreateObject("WScript.Shell")
filePath    = WshShell.CurrentDirectory & "\start.bat"
WshShell.Run chr(34) & filePath & chr(34), 0
Set WshShell = Nothing

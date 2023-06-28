Dim WshShell, strCurDir
Set WshShell = CreateObject("WScript.Shell")
strCurDir    = WshShell.CurrentDirectory
WshShell.Run chr(34) & strCurDir & "\start.bat" & chr(34), 0
Set WshShell = Nothing
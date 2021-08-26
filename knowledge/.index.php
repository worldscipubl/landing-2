<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <link rel="shortcut icon" href="./.favicon.ico">
    <title>База знаний</title>

    <link rel="stylesheet" href="./.style.css">
    <script src="./.sorttable.js"></script>
</head>

<body>
<div id="container">
    <h1>База знаний</h1>

    <table class="sortable">
        <thead>
        <tr>
            <th>Название</th>
            <th>Тип</th>
            <th>Размер</th>
            <th>Последнее изменение</th>
        </tr>
        </thead>
        <tbody><?php

        // Adds pretty filesizes
        function pretty_filesize($file)
        {
            $size = filesize($file);
            if ($size < 1024) {
                $size = $size . " Bytes";
            } elseif (($size < 1048576) && ($size > 1023)) {
                $size = round($size / 1024, 1) . " KB";
            } elseif (($size < 1073741824) && ($size > 1048575)) {
                $size = round($size / 1048576, 1) . " MB";
            } else {
                $size = round($size / 1073741824, 1) . " GB";
            }
            return $size;
        }

        $hide = ".";

        if (!isset($_SERVER['QUERY_STRING']) || $_SERVER['QUERY_STRING'] == "" || $_SERVER['QUERY_STRING'] == "..") {
            $currdir = ".";
        } else {
            $currdir = $_SERVER['QUERY_STRING'];
        }

        // Opens directory
        $myDirectory = opendir($currdir);

        // Gets each entry
        while ($entryName = readdir($myDirectory)) {
            $dirArray[] = $entryName;
        }

        // Closes directory
        closedir($myDirectory);

        // Counts elements in array
        $indexCount = count($dirArray);

        // Sorts files
        sort($dirArray);

        // Loops through the array of files
        for ($index = 0; $index < $indexCount; $index++) {

            // Decides if hidden files should be displayed, based on query above.
            if (substr("$dirArray[$index]", 0, 1) != $hide || ($currdir != '.' && $dirArray[$index] == "..")) {

                // Resets Variables
                $favicon = "";
                $class = "file";

                // Gets File Names
                $name = $dirArray[$index];
                $namehref = ($currdir == "." ? "" : $currdir . '/') . $dirArray[$index];

                // Gets Date Modified
                $modtime = date("M j Y g:i A", filemtime($dirArray[$index]));
                $timekey = date("YmdHis", filemtime($dirArray[$index]));


                // Separates directories, and performs operations on those directories
                if (is_dir($currdir . '/' . $dirArray[$index])) {
                    $extn = "-";
                    $size = "&lt;Папка&gt;";
                    $sizekey = "0";
                    $class = "dir";

                    // Gets favicon.ico, and displays it, only if it exists.
                    if (file_exists("$namehref/favicon.ico")) {
                        $favicon = " style='background-image:url($namehref/favicon.ico);'";
                        $extn = "&lt;Website&gt;";
                    }

                    // Cleans up . and .. directories
                    if ($name == ".") {
                        $name = ". (Текущий каталог)";
                        $extn = "&lt;Системный каталог&gt;";
                        $favicon = " style='background-image:url($namehref/.favicon.ico);'";
                    }
                    if ($name == "..") {
                        $name = "..(вернуться назад)";
                        $extn = "&lt;Системный каталог&gt;";
                    }
                    if ($currdir == "." && $dirArray[$index] == "..")
                        $namehref = "";
                    elseif ($dirArray[$index] == "..") {
                        $dirs = explode('/', $currdir);
                        unset($dirs[count($dirs) - 1]);
                        $prevdir = implode('/', $dirs);
                        $namehref = '?' . $prevdir;
                    } else
                        $namehref = '?' . $namehref;
                } // File-only operations
                else {
                    // Gets file extension
                    $extn = pathinfo($dirArray[$index], PATHINFO_EXTENSION);

                    // Prettifies file type
                    switch ($extn) {
                        case "png":
                            $extn = "PNG Image";
                            break;
                        case "jpg":
                            $extn = "JPEG Image";
                            break;
                        case "jpeg":
                            $extn = "JPEG Image";
                            break;
                        case "svg":
                            $extn = "SVG Image";
                            break;
                        case "gif":
                            $extn = "GIF Image";
                            break;
                        case "ico":
                            $extn = "Windows Icon";
                            break;

                        case "txt":
                            $extn = "Text File";
                            break;
                        case "log":
                            $extn = "Log File";
                            break;
                        case "htm":
                            $extn = "HTML File";
                            break;
                        case "html":
                            $extn = "HTML File";
                            break;
                        case "xhtml":
                            $extn = "HTML File";
                            break;
                        case "shtml":
                            $extn = "HTML File";
                            break;
                        case "php":
                            $extn = "PHP Script";
                            break;
                        case "js":
                            $extn = "Javascript File";
                            break;
                        case "css":
                            $extn = "Stylesheet";
                            break;

                        case "pdf":
                            $extn = "PDF Document";
                            break;
                        case "xls":
                            $extn = "Spreadsheet";
                            break;
                        case "xlsx":
                            $extn = "Spreadsheet";
                            break;
                        case "doc":
                            $extn = "Microsoft Word Document";
                            break;
                        case "docx":
                            $extn = "Microsoft Word Document";
                            break;

                        case "zip":
                            $extn = "ZIP Archive";
                            break;
                        case "htaccess":
                            $extn = "Apache Config File";
                            break;
                        case "exe":
                            $extn = "Windows Executable";
                            break;

                        default:
                            if ($extn != "") {
                                $extn = strtoupper($extn) . " File";
                            } else {
                                $extn = "Sconosciuto";
                            }
                            break;
                    }

                    // Gets and cleans up file size
                    $size = pretty_filesize($fullname);
                    $sizekey = filesize($fullname);
                    $target = strcmp($class, 'dir') ? '_blank' : "_parent";
                }

                // Output
                echo("
		<tr class='$class'>
			<td><a href='$namehref'$favicon class='name' target='$target'>$name</a></td>
			<td><a href='$namehref' target='$target'>$extn</a></td>
			<td sorttable_customkey='$sizekey'><a href='$namehref' target='$target'>$size</a></td>
			<td sorttable_customkey='$timekey'><a href='$namehref' target='$target'>$modtime</a></td>
		</tr>");
            }
        }
        ?>

        </tbody>
    </table>
</div>
</body>
</html>

#!/bin/bash

#./order_media.sh /media/pi/src_dir /media/pi/dest_dir

inputdir=$1
outputdir=$2

filenames=($(find $inputdir -maxdepth 1 -type f -exec echo "{}" \; | grep -Ei ".mp4$"))

for (( idx=0 ; idx<${#filenames[@]} ; idx++ ));
do
    mnthyr=$(ffprobe -v quiet -show_format ${filenames[$idx]} | grep -Eoi "creation_time=[0-9]{4}-[0-9]{2}" | grep -Eoi "[0-9]{4}-[0-9]{2}" | tail -1)


    if [[ "$mnthyr" == "" ]]
    then
        echo ${filenames[$idx]} - "meta empty"
    else

        yr=$(echo $mnthyr | grep -Eoi "[0-9]{4}")
        echo mv ${filenames[$idx]} $outputdir/$yr/$mnthyr/

        mkdir -p $outputdir/$yr/$mnthyr/
        mv ${filenames[$idx]} $outputdir/$yr/$mnthyr/
    fi

done

filenames=($(find $inputdir -maxdepth 1 -type f -exec echo "{}" \; | grep -Ei ".jpg$"))

for (( idx=0 ; idx<${#filenames[@]} ; idx++ ));
do
    mnthyr=$(exiftool ${filenames[$idx]} | grep -Eio "Create Date.*" | grep -Eio "[0-9]{4}:[0-9]{2}" | tr ':' '-' | tail -1)


    if [[ "$mnthyr" == "" ]]
    then
        echo ${filenames[$idx]} - "meta empty"
    else
        yr=$(echo $mnthyr | grep -Eoi "[0-9]{4}")
        echo mv ${filenames[$idx]} $outputdir/$yr/$mnthyr/

        mkdir -p $outputdir/$yr/$mnthyr/
        mv ${filenames[$idx]} $outputdir/$yr/$mnthyr/
    fi

done

filenames=($(find $inputdir -maxdepth 1 -type f -exec echo "{}" \; | grep -Ei ".jpg$|.jpeg$|.mp4$"))

for (( idx=0 ; idx<${#filenames[@]} ; idx++ ));
do

    mnthyr=$(echo ${filenames[$idx]} | grep -Eio "[_-][0-9]{8}[_-]" | grep -Eio "[0-9]{8}" | grep -Eio "[0-9]{6}")


    if [[ "$mnthyr" == "" ]]
    then
        echo ${filenames[$idx]} - "meta empty"
    else
        mnthyr=$(echo ${mnthyr:0:4}-${mnthyr:4:2})

        yr=$(echo $mnthyr | grep -Eoi "[0-9]{4}")
        echo mv ${filenames[$idx]} $outputdir/$yr/$mnthyr/

        mkdir -p $outputdir/$yr/$mnthyr/
        mv ${filenames[$idx]} $outputdir/$yr/$mnthyr/
    fi

done


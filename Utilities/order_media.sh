#!/bin/bash

#./order_media.sh /media/pi/src_dir /media/pi/dest_dir

inputdir=$1
outputdir=$2

ll=($(find $inputdir -maxdepth 1 -type f -exec echo "{}" \; | grep -Ei ".mp4$"))

for (( idx=0 ; idx<${#ll[@]} ; idx++ ));
do
    mnthyr=$(ffprobe -v quiet -show_format ${ll[$idx]} | grep -Eoi "creation_time=[0-9][0-9][0-9][0-9]-[0-9][0-9]" | grep -Eoi "[0-9][0-9][0-9][0-9]-[0-9][0-9]" | tail -1)


    if [[ "$mnthyr" == "" ]]
    then
        echo ${ll[$idx]} - "meta empty"
    else

        yr=$(echo $mnthyr | grep -Eoi "[0-9]{4}")
        echo mv ${ll[$idx]} $outputdir/$yr/$mnthyr/

        mkdir -p $outputdir/$yr/$mnthyr/
        mv ${ll[$idx]} $outputdir/$yr/$mnthyr/
    fi

done

ll=($(find $inputdir -maxdepth 1 -type f -exec echo "{}" \; | grep -Ei ".jpg$"))

for (( idx=0 ; idx<${#ll[@]} ; idx++ ));
do
    mnthyr=$(exiftool ${ll[$idx]} | grep -Eio "Create Date.*" | grep -Eio "[0-9][0-9][0-9][0-9]:[0-9][0-9]" | tr ':' '-' | tail -1)


    if [[ "$mnthyr" == "" ]]
    then
        echo ${ll[$idx]} - "meta empty"
    else
        yr=$(echo $mnthyr | grep -Eoi "[0-9]{4}")
        echo mv ${ll[$idx]} $outputdir/$yr/$mnthyr/

        mkdir -p $outputdir/$yr/$mnthyr/
        mv ${ll[$idx]} $outputdir/$yr/$mnthyr/
    fi

done

ll=($(find $inputdir -maxdepth 1 -type f -exec echo "{}" \; | grep -Ei ".jpg$|.jpeg$|.mp4$"))

for (( idx=0 ; idx<${#ll[@]} ; idx++ ));
do

    mnthyr=$(echo ${ll[$idx]} | grep -Eio "[_-][0-9]{8}[_-]" | grep -Eio "[0-9]{8}" | grep -Eio "[0-9]{6}")


    if [[ "$mnthyr" == "" ]]
    then
        echo ${ll[$idx]} - "meta empty"
    else
        mnthyr=$(echo ${mnthyr:0:4}-${mnthyr:4:2})

        yr=$(echo $mnthyr | grep -Eoi "[0-9]{4}")
        echo mv ${ll[$idx]} $outputdir/$yr/$mnthyr/

        mkdir -p $outputdir/$yr/$mnthyr/
        mv ${ll[$idx]} $outputdir/$yr/$mnthyr/
    fi

done


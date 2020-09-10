import React, { useState, useEffect } from 'react'
import './index.css'
import isElectron from 'is-electron';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import * as path from 'path'
import normalize from 'normalize-path'

interface PlayListState {
    currentMusicIndex: number,
}

const Footer: React.FC<PlayListState> = ({ currentMusicIndex }) => {
    const [playingIndex, setPlayingIndex] = useState(currentMusicIndex)
    const [playlist, setPlaylist] = useState([{ name: '', src: '' }])

    useEffect(() => {
        window.ipcRenderer.send('load-file-request')
    }, [])

    if (isElectron()) {
        window.ipcRenderer.on('loaded-file', (event: any, paths: any) => {
            setPlaylist(paths)
        })
        
        window.ipcRenderer.on('selected-file', (event: any, paths: any) => {
            paths.filePaths.map(async (file: string) => {
                const previewPlaylist = playlist
                if(previewPlaylist[0].src === "") previewPlaylist.shift()
                
                previewPlaylist.push({ 
                    name: path.basename(normalize(file), path.extname(file)), 
                    src: file 
                })

                setPlaylist(previewPlaylist)
            })
        })
    }

    function handleClickPrevious() {
        if (playingIndex === 0) {
            setPlayingIndex((playlist.length - 1))
        } else {
            const resultPlayingIndex = playingIndex - 1
            setPlayingIndex(resultPlayingIndex)
        }
    }

    function handleClickNext() {
        if (playingIndex === (playlist.length - 1)) {
            setPlayingIndex(0)
        } else {
            const resultPlayingIndex = playingIndex + 1
            setPlayingIndex(resultPlayingIndex)
        }
    }

    return (
        <footer>
            {playlist[playingIndex].name &&
                <div className="playing-now-div">
                    <h3>Playing Now</h3>
                    <p>{playlist[playingIndex].name}</p>
                </div>
            }
            <AudioPlayer
                onEnded={handleClickNext}
                autoPlay={false}
                showDownloadProgress={false}
                autoPlayAfterSrcChange={true}
                src={playlist[playingIndex].src}
                className="main-audio"
                layout="stacked-reverse"
                showSkipControls={true}
                showJumpControls={false}
                onClickPrevious={handleClickPrevious}
                onClickNext={handleClickNext}
                customIcons={{
                    play: <span className="iconify" data-icon="octicon:play-24" data-inline="false"></span>,
                    pause: <span className="iconify" data-icon="teenyicons:pause-circle-outline" data-inline="false"></span>,
                    previous: <span className="iconify controlers" data-icon="ant-design:step-backward-filled" data-inline="false"></span>,
                    next: <span className="iconify controlers" data-icon="ant-design:step-forward-filled" data-inline="false"></span>

                }}
                customControlsSection={[
                    <button className="shuffle rhap_button-clear"><span className="iconify" data-icon="ion:shuffle" data-inline="false" data-width="1.6rem"></span></button>,
                    RHAP_UI.MAIN_CONTROLS,
                    RHAP_UI.LOOP,
                    RHAP_UI.VOLUME,
                ]} />
        </footer>
    )
}

export default Footer
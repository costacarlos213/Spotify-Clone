import React, { useState, useEffect } from 'react'
import './index.css'
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import isElectron from 'is-electron'
import { basename, extname } from 'path'
import normalize from 'normalize-path'

interface PlayListState {
    currentMusicIndex: number,
}

let songs: Array<PlaylistSongProps> = [
    { name: '', src: '' }
]

window.ipcRenderer.on('selected-file', (event: any, filePaths: any) => {
    filePaths.map((Path: string) => {
        return songs.push({
            name: basename(normalize(Path), extname(Path)),
            src: normalize(Path)
        })
    })
})

const Footer: React.FC<PlayListState> = ({ currentMusicIndex }) => {
    const [playingIndex, setPlayingIndex] = useState(currentMusicIndex)
    const [playlist, setPlaylist] = useState<Array<PlaylistSongProps>>([{ name: '', src: '' }])

    if (isElectron()) {
        window.ipcRenderer.once('loaded-file', (event: any, paths: Array<PlaylistSongProps>) => {
            songs = paths
            setPlaylist(paths)
        })
    }

    useEffect(() => {
        window.ipcRenderer.send('load-file-request')
    }, [])

    useEffect(() => {
        setPlaylist(songs)
    }, [songs])

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
            {playlist[playingIndex].src &&
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
                src={playlist[playingIndex].src ? playlist[playingIndex].src : ''}
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
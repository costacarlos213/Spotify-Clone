import React from 'react'
import './index.css'
import 'react-h5-audio-player/lib/styles.css';
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import { Link } from 'react-router-dom';
import isElectron from 'is-electron'


export default function LibraryPage() {
    function handler() {
        if (isElectron()) {
            window.ipcRenderer.send('open-file-dialog')
        }
    }

    

    return (
        <div className="container home-page" id="home-page">
            <Sidebar />
            <div className="main-field">
                <Header name="library">
                    <div className="shelf">
                        <Link to="#">
                            <span>
                                Playlists
                            </span>
                        </Link>
                        <button onClick={handler}>
                            <span>
                                New
                            </span>
                        </button>
                    </div>
                </Header>
                <main>
                    
                </main>
            </div>
        </div>
    )

}
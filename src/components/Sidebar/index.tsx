import React from 'react'
import logoImg from '../../assets/images/spotifyLogo.png'
import * as Icons from 'react-feather'
import './index.css'
import { Link } from 'react-router-dom'

const Sidebar = React.memo(props => {
    let previewButton: HTMLElement | null = null
    
    function turnLight(name: string) {
        const button = document.getElementById(name)
    
        if (previewButton === button) {
            return
        } else {
            if (button) {
                if (button?.style.backgroundColor !== 'transparent') {
                    button.style.backgroundColor = '#2b2b2b'
                    button.style.color = 'white'
                }
            }
        
            if (previewButton != null) {
                previewButton.style.backgroundColor = 'transparent'
                previewButton.style.color = '#A9A9A9'
            }
    
            previewButton = button
            return
        }
    }

    
    return (
        <section className="nav-div">
            <div className="content">
                <div className="logo-div">
                    <img alt="Spotify" src={logoImg} />
                </div>
                <div className="routes-div">
                    <Link to="/" onClick={(e) => turnLight('home')} id="home" >
                        <Icons.Home size={25} strokeWidth={1} />
                        <span>Home</span>
                    </Link>
                    <Link to="search" onClick={() => turnLight('search')}
                        id="search"
                        style={{ backgroundColor: 'transparent' }}>

                        <Icons.Search size={25} strokeWidth={1} />
                        <span>Search</span>
                    </Link>
                    <Link to="library" onClick={(e) => turnLight('library')}
                        id="library"
                        style={{ backgroundColor: 'transparent' }}>

                        <Icons.Bookmark size={25} strokeWidth={1} />
                        <span>Library</span>
                    </Link>

                </div>
                <div className="playlist-div">
                    <p>Playlists</p>
                    <div>
                        <div>
                            <button>
                                <Icons.Plus />
                            </button>
                            <span>Create Playlist</span>
                        </div>
                        <div>
                            <button>
                                <Icons.ThumbsUp />
                            </button>
                            <span>Liked Songs</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
})




export default Sidebar
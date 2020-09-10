import React from 'react'
import './index.css'
import 'react-h5-audio-player/lib/styles.css';
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import Chart from '../../components/Chart'

export default function HomePage() {
    return (
        <div className="container home-page" id="home-page">
            <Sidebar />
            <div className="main-field">
                <Header name="home">
                    <button id="upgrade">
                        Upgrade
                    </button>
                </Header>
                <main>
                    <div className="recently">
                        <h1>Recently played</h1>
                        <div className="albums">
                            <Chart
                                title="Made for you"
                                desc="By Carlos Eduardo"
                                songTitle="Recayd"
                            />
                            <Chart
                                title="Made for you"
                                desc="By Carlos Eduardo"
                                songTitle="Recayd"
                            />
                        </div>
                    </div>
                    <div className="recently">
                        <h1>Made for You</h1>
                        <div className="albums">
                            <Chart
                                title="Made for you"
                                desc="By Carlos Eduardo"
                                songTitle="Recayd"
                            />
                        </div>
                    </div>
                </main>
            </div>
            {/* <Footer /> */}
        </div>
    )

}
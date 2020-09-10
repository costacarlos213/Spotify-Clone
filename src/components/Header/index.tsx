import React from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import './index.css'

interface HeaderProps {
    name: string
}

const Header: React.FC<HeaderProps> = ({children, name}) => {    
    const idName = name + '-inserted-field'
    
    return (
        <header>
            <div className="buttons-div">
                <button>
                    <ChevronLeft size={28} strokeWidth={1} />
                </button>
                <button>
                    <ChevronRight size={28} strokeWidth={1} />
                </button>
            </div>
            <div id={idName}>
                {children}
            </div>
            <div className="account-info">
                <div>
                    <img alt="Carlos" src="https://scontent.fcgh23-1.fna.fbcdn.net/v/t1.0-9/69446014_1649424915192256_2127394088796815360_o.jpg?_nc_cat=111&_nc_sid=09cbfe&_nc_eui2=AeExAMz5_i5ZLuZSz1-T8UlL_8d5zLSWHLb_x3nMtJYctj__jplaFYkuMcv0W_MgTgciqAm3Be3Cdfh5pSXl6YLS&_nc_ohc=5p9yk4DoRjoAX_TfAHc&_nc_ht=scontent.fcgh23-1.fna&oh=61c9a654fdcdbf2869fc2ad4725b1441&oe=5F7A0C22" />
                    <p>Carlos Eduardo</p>
                </div>
            </div>
        </header>
    )
}

export default Header
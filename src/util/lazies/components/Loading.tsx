import "./loading.scss";
import Icon from './icon.png'
import { Player } from 'video-react';
import video from './stock-footage-circle-loading-icon-loop-out-animation-with-dark-background.webm'

export default function Loading() {
    return (
        <div className="loading_container">
            <img
                className="rotating-image"
                src="https://i.stack.imgur.com/NKEOW.jpg"
            />
        </div>

    );
}
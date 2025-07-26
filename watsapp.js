(function () {
  const widget = document.createElement("div");
  widget.id = "emprux-wa-widget";
  widget.innerHTML = `
    <style>
      #emprux-wa-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #25D366;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 9999;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        display: none; /* Initially hidden */
      }

      #emprux-wa-button img {
        width: 30px;
        height: 30px;
      }

      #emprux-wa-popup {
        display: none;
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 300px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        font-family: sans-serif;
        z-index: 9999;
        overflow: hidden;
      }

      #emprux-wa-header {
        background-color: #075e54;
        color: white;
        padding: 10px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      #emprux-wa-body {
        padding: 15px;
        background-image: url('./image/bgforwhatsapp.jpg'); /* Optional background */
        background-size: cover;
      }

      #emprux-wa-body p {
        background: white;
        padding: 10px;
        border-radius: 8px;
        margin-bottom: 10px;
      }

      #emprux-wa-start-btn {
        background-color: #25D366;
        color: white;
        padding: 10px;
        text-align: center;
        border-radius: 25px;
        cursor: pointer;
        font-weight: bold;
        margin: 10px;
      }

      #emprux-wa-footer {
        text-align: center;
        font-size: 10px;
        color: #aaa;
        padding-bottom: 10px;
      }

      #emprux-close {
        cursor: pointer;
        font-size: 20px;
      }
      #emprux-pcolor {
        font-size: 18px;
        font-weight: bold;
        color: #FD5D70;
      }
      #emprux-pcolor1 {
        font-size: 18px;
        font-weight: bold;
        color: rgb(56, 0, 169);
      }
    </style>

    <div id="emprux-wa-popup">
      <div id="emprux-wa-header">
        <span>IACSC</span>
        <span id="emprux-close">×</span>
      </div>
      <div id="emprux-wa-body">
        <p>Hi,<br>How can I help you?</p>
      
      </div>
      <div id="emprux-wa-start-btn" onclick="window.open('https://wa.me/919408921814?text=Hi%20I%20need%20some%20help!', '_blank')">Start chat</div>
      <div id="emprux-wa-footer">⚡ by IACSC</div>
    </div>

    <div id="emprux-wa-button">
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" />
    </div>
  `;
  document.body.appendChild(widget);

  // Function to play sound if 24 hours have passed
  const playPopupSound = () => {
    const lastPlayed = localStorage.getItem('emprux-wa-sound-last-played');
    const now = Date.now();
    const oneDayInMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (!lastPlayed || now - parseInt(lastPlayed) > oneDayInMs) {
      const audio = new Audio('https://www.emprux.in/Sound/Whatsappaudio.mp3');
      audio.play().catch((error) => console.log('Audio playback failed:', error));
      localStorage.setItem('emprux-wa-sound-last-played', now.toString());
    }
  };

  // Show button after 2 seconds
  setTimeout(() => {
    const waButton = document.getElementById('emprux-wa-button');
    waButton.style.display = 'flex';
  }, 2000);

  // Show popup and play sound on icon click
  document.getElementById('emprux-wa-button').onclick = () => {
    document.getElementById('emprux-wa-popup').style.display = 'block';
    playPopupSound(); // Play sound when popup is shown
  };

  // Close popup
  document.getElementById('emprux-close').onclick = () => {
    document.getElementById('emprux-wa-popup').style.display = 'none';
  };
})();
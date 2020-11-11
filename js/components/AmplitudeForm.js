const template = document.createElement('template');
template.innerHTML = `
    <div class="form">
        <div class=col>
            <div class="checkbox">
                <input type="checkbox" id="showText">
                <label for="showText">Text</label>
            </div>
            <input type="number" id="textInput" min="1" max="9">
        </div>
        <br>
        <div class=col> 
            <div class="checkbox">   
                <input type="checkbox" id="showSlider">
                <label for="showSlider">Slider</label>
            </div>
            <input type="range" min="1" max="9" class="slider" id="rangeInput">
        </div>

        <style>
            .slider {
                -webkit-appearance: none;
                width: 40%;
                height: 10px;
                border-radius: 5px;
                background: #d3d3d3;
                outline: none;
                opacity: 0.7;
                -webkit-transition: .2s;
                transition: opacity .2s;
            }
            .slider:hover {
                opacity: 1;
            }
            .slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background: #bd2130;
                cursor: pointer;
            }
            
            .slider::-moz-range-thumb {
                width: 25px;
                height: 25px;
                border-radius: 50%;
                background: #bd2130;
                cursor: pointer;
            }

            .form {
                margin-top: 20px;
            }
           
            .col{
                display: flex;
                width: 70%;
                margin: 0 auto;
            }

            .checkbox {
                flex: 1;
            }

            #textInput {
                flex: 2;
                display: none;
            }

            #rangeInput {
                margin-top: 10px;
                flex: 2;
                display: none;
            }




        </style>
    </div>
`;


class AmplitudeForm extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('#textInput').value = this.getAttribute('initial-value');
        this.shadowRoot.querySelector('#rangeInput').value = this.getAttribute('initial-value');
        this.shadowRoot.querySelector('#showText').checked = false;
        this.shadowRoot.querySelector('#showSlider').checked = false;
    }

    connectedCallback() {
        // this.shadowRoot.querySelector('#increment-button').addEventListener('click', () =>
        // {
        //     this.shadowRoot.querySelector('span').innerText =
        //         (parseInt(this.shadowRoot.querySelector('span').innerText) + 1);
        // });

        this.shadowRoot.querySelector('#showText').addEventListener('change', () =>
        {
            var checkbox = this.shadowRoot.querySelector('#showText');
            if (checkbox.checked) {
                this.shadowRoot.querySelector('#textInput').style.display = "block";
            } else {
                this.shadowRoot.querySelector('#textInput').style.display = "none";
            }
        });

        this.shadowRoot.querySelector('#showSlider').addEventListener('change', () =>
        {
            var checkbox = this.shadowRoot.querySelector('#showSlider');
            if (checkbox.checked) {
                this.shadowRoot.querySelector('#rangeInput').style.display = "block";
            } else {
                this.shadowRoot.querySelector('#rangeInput').style.display = "none";
            }
        });

        this.shadowRoot.querySelector('#textInput').addEventListener('change', () =>
        {
            this.shadowRoot.querySelector('#rangeInput').value = this.shadowRoot.querySelector('#textInput').value;
        });

        this.shadowRoot.querySelector('#rangeInput').addEventListener('change', () =>
        {
            this.shadowRoot.querySelector('#textInput').value = this.shadowRoot.querySelector('#rangeInput').value;
        });


    }
}


window.customElements.define('amplitude-form', AmplitudeForm);
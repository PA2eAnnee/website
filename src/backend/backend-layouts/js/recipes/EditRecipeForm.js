import {Form} from '../global/Form.js';
import {API} from '../global/API.js';

export class EditRecipeForm extends Form {
    name;
    description;
    duration;
    complexityLevel;
    video;
    id;
    ctx;
    list;

    constructor(container, buttonText, name, description, duration, complexityLevel, video, ctx, id, list) {
        super(container, buttonText);
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.complexityLevel = complexityLevel;
        this.video = video;
        this.ctx = ctx;
        this.id = id;
        this.list = list;
    }

    send() {
        let toSend = {};
        for(const input of this.inputs) {
            switch(input.name) {
                case "name":
                    if(input.value !== this.name) {
                        toSend.Name = input.value;
                    }
                    break;
                case "description":
                    if(input.value !== this.description) {
                        toSend.Description = input.value;
                    }
                    break;
                case "duration":
                    if(input.value !== this.duration) {
                        toSend.Duration = input.value;
                    }
                    break;
                case "complexityLevel":
                    if(input.value !== this.complexityLevel) {
                        toSend.ComplexityLevel = input.value;
                    }
                    break;
                case "video":
                    if(input.value !== this.video) {
                        toSend.Video = input.value;
                    }
                    break;   
            }
        }
        if(Object.keys(toSend).length > 0) {
            API.updateRecipes(this.id, toSend).then(() => {
                this.ctx.destroy();
                if(toSend.Name) {
                    this.name = toSend.Name;
                    this.list.updateListElem('name', toSend.Name, this.id);
                }
                if(toSend.Description) {
                    this.description = toSend.Description;
                    this.list.updateListElem('description', toSend.Description, this.id);
                }
                if(toSend.Duration) {
                    this.duration = toSend.Duration;
                    this.list.updateListElem('duration', toSend.Duration, this.id);
                }
                if(toSend.ComplexityLevel) {
                    this.complexityLevel = toSend.ComplexityLevel;
                    this.list.updateListElem('complexityLevel', toSend.ComplexityLevel, this.id);
                }
                if(toSend.Video) {
                    this.video = toSend.Video;
                    this.list.updateListElem('video', toSend.Video, this.id);
                }
                
            }).catch(error => {
                console.log(error);
            })
        }
    }

}
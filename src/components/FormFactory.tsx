import TextInput, {TextInputProps} from './TextInput';
import TextareaInput, {TextareaInputProps} from './TextareaInput';
import ImageInput, {ImageInputProps} from './ImageInput';
import Select, {SelectProps} from './Select';
import NumberInput, {NumberInputProps} from './NumberInput';

export type FormFactoryProps =
|{
    type:"TEXT_INPUT";
    props:TextInputProps;
}
|{
    type:"TEXTAREA_INPUT";
    props:TextareaInputProps;
}
|{
    type:"IMAGE_INPUT";
    props:ImageInputProps;
}
|{
    type:"SELECT";
    props:SelectProps;
}
|{
    type:"NUMBER_INPUT";
    props:NumberInputProps;
}

export const FormFactory = ({
    type,
    props
}:FormFactoryProps) => {
    switch(type){
        case "TEXT_INPUT":
            return <TextInput {...props}/>
        case "TEXTAREA_INPUT":
            return <TextareaInput {...props}/>
        case "IMAGE_INPUT":
            return <ImageInput {...props}/>
        case "SELECT":
            return <Select {...props}/>
        case "NUMBER_INPUT":
            return <NumberInput {...props}/>
        default:
            return null;
    }
}
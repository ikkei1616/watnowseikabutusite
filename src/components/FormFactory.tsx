import TextInput, {TextInputProps} from './TextInput';
import TextareaInput, {TextareaInputProps} from './TextareaInput';
import ImageInput, {ImageInputProps} from './ImageInput';
import SelectInput, {SelectProps} from './Select';
import NumberInput, {NumberInputProps} from './NumberInput';
import { FieldValues } from 'react-hook-form';

export type FormFactoryProps<T extends FieldValues> =
|{
    type:"TEXT_INPUT";
    props:TextInputProps<T>;
}
|{
    type:"TEXTAREA_INPUT";
    props:TextareaInputProps<T>;
}
|{
    type:"IMAGE_INPUT";
    props:ImageInputProps<T>;
}
|{
    type:"SELECT_INPUT";
    props:SelectProps<T>;
}
|{
    type:"NUMBER_INPUT";
    props:NumberInputProps<T>;
}

export const FormFactory = <T extends FieldValues>({
    type,
    props
}:FormFactoryProps<T>) => {
    switch(type){
        case "TEXT_INPUT":
            return <TextInput {...props} defaultValue={"" as any}/>
        case "TEXTAREA_INPUT":
            return <TextareaInput {...props}/>
        case "IMAGE_INPUT":
            return <ImageInput {...props}/>
        case "SELECT_INPUT":
            return <SelectInput {...props}/>
        case "NUMBER_INPUT":
            return <NumberInput {...props} defaultValue={0 as any}/>
        default:
            return null;
    }
}
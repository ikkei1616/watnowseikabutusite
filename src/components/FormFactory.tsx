import TextInput, {TextInputProps} from './TextInput';
import TextareaInput, {TextareaInputProps} from './TextareaInput';
import ImageInput, {ImageInputProps} from './ImageInput';
import SelectInput, {SelectProps} from './Select';
import NumberInput, {NumberInputProps} from './NumberInput';
import MultipleSelect, {MultipleSelectProps} from './MultipleSelect';
import Period, {PeriodProps} from './PeriodInput';
import DateInput, {DateProps} from './DateInput';
import CheckboxLabels, {CheckboxLabelsProps} from './CheckBoxLabels';
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
|{
    type:"MULTIPLE_SELECT";
    props:MultipleSelectProps<T>;
}
|{
    type:"PERIOD_INPUT";
    props:PeriodProps<T>;
}
|{
    type:"DATE_INPUT";
    props:DateProps<T>;
}
|{
    type:"CHECKBOX";
    props:CheckboxLabelsProps<T>;
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
        case "MULTIPLE_SELECT":
            return <MultipleSelect {...props}/>
        case "PERIOD_INPUT":
            return <Period {...props}/>
        case "DATE_INPUT":
            return <DateInput {...props}/>
        case "CHECKBOX":
            return <CheckboxLabels {...props}/>
        default:
            return null;
    }
}
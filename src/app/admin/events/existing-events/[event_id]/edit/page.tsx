"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from "next/navigation";
import { Form, set, SubmitHandler, useForm } from "react-hook-form";
import { EventInputSchema, EventOutputSchema, resolver } from "../../../new/eventFormSchema";
import { createFormFields, FormField, AddAwardField } from "../../../new/hooks";
import { FormFactory } from "@/components/form/FormFactory";
import FormButton from '@/components/form/FormButton';
import { supabase } from '@/supabase/supabase';
import LoadingModal from '@/components/loading/LoadingModal';
import AdminHeader from '@/components/admin/AdminHeader';
import FormFieldType from '@/types/FormFieldType';

const EditEventPage = ({
  params,
}: {
  params: { event_id: string };
}) => {
  const { control, handleSubmit, reset, getValues, formState: { errors } } = useForm<EventInputSchema>({
    mode: "onChange",
    resolver: resolver,
  });

  const eventId = params.event_id;
  const [formFields, setFormFields] = useState<{ container: string, title: string, fields: FormField<EventInputSchema>[] }[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [imageDataURL, setImageDataURL] = useState<string | undefined>(undefined);
  const [checkImageDataURL, setCheckImageDataURL] = useState<string | undefined>(undefined);
  const [checkAwardsData, setCheckAwardsData] = useState<{ name: string, order_num: number }[]>([]);

  const defaultImage = useRef<string | undefined>(undefined);

  const [awardFields, setAwardFields] = useState<FormField<EventInputSchema>[]>([]);
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  const router = useRouter();

  const convertToFormField = (awardField: AddAwardField): FormField<EventInputSchema> => {
    return {
      id: awardField.id,
      type: awardField.type,
      props: {
        control: awardField.props.control,
        name: awardField.props.name as keyof EventInputSchema,
        label: awardField.props.label,
      },
    };
  };

  const addAwardField = () => {
    setAwardFields((prev) => {
      const index = (prev.length +7);


      const newFields: AddAwardField[] = [
        {
          id: index,
          type: FormFieldType.textInput,
          props: {
            control,
            name: `awards[${index}].name`,
            label: `表彰名 ${prev.length / 2 + 1}`,
            placeholder: "例) 最優秀賞",
          },
        },
        {
          id:index + 1,
          type: FormFieldType.numberInput,
          props: {
            control,
            name: `awards[${index}].order_num`,
            label: `受賞数`,
            placeholder: "例) 1",
          },
        },
      ];

      const updatedFields = [...prev, ...newFields.map(convertToFormField)];
      return updatedFields;
    });
  };


  useEffect(() => {
    const fetcheventsData = async () => {
      try {
        const { data: eventData, error: eventError } = await supabase
          .from('events')
          .select('*')
          .eq('id', eventId)
          .single();

        if (eventError) {
          throw new Error(`Error fetching event: ${eventError.message}`);
        }

        if (eventData.image) {
          const splitURl = eventData.image.split('/');
          const fileName = splitURl[splitURl.length - 1];
          setCheckImageDataURL(fileName);
          defaultImage.current = eventData.image;
        }

        return {
          name: eventData.name,
          comment: eventData.comment,
          location: eventData.location,
          thumbnailImage: eventData.image,
          release_year: eventData.year,
          release_month: eventData.month,
          url: eventData.url,
        }

      } catch (error) {
        console.error(error);
      }
    }

    const fetchAwardsData = async () => {
      try {
        const { data: awardsData, error: awardsError } = await supabase
          .from('awards')
          .select('*')
          .eq('event_id', eventId);

        if (awardsError) {
          throw new Error(`Error fetching awards: ${awardsError.message}`);
        }

        return awardsData.map((award) => ({
          name: award.name,
          order_num: award.order_num,
        })) || [];

      } catch (error) {
        console.error(error);
      }
    }

    const fetchData = async () => {
      try {
        const [eventData, awardsData] = await Promise.all([fetcheventsData(), fetchAwardsData()]);
        if (eventData) {
          reset({
            name: eventData.name,
            comment: eventData.comment,
            location: eventData.location,
            thumbnailImage: undefined,
            release_year: eventData.release_year,
            release_month: eventData.release_month,
            url: eventData.url,
            awards: awardsData,
          });
        }
        setCheckAwardsData(awardsData || []);
        setImageDataURL(eventData?.thumbnailImage);
        const getAwardsFields = (awardsData || []).map((award, index) => [
          {
            id: index * 2 + 7,
            type: FormFieldType.textInput as any,
            props: {
              control,
              name: `awards[${index}].name`,
              label: `表彰名 ${index + 1}`,
              placeholder: "例) 最優秀賞",
            },
          },
          {
            id: index * 2 + 1 + 7,
            type: FormFieldType.numberInput,
            props: {
              control,
              name: `awards[${index}].order_num`,
              label: `受賞数`,
              placeholder: "例) 1",
            },
          },
        ]).flat();
        setAwardFields(getAwardsFields.map(convertToFormField));
      } catch (error) {
        console.error(error);
      } finally {
        setIsFirstLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  useEffect(() => {
    setFormFields(createFormFields(control, awardFields, addAwardField, defaultImage.current));
  }, [defaultImage.current, awardFields]);

  const handleCancel = () => {
    const confirmDelete = window.confirm("編集内容が破棄されますがよろしいですか？");

    if (!confirmDelete) {
      return;
    }
    router.push('/admin/events/existing-events');
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm("本当に削除しますか？");

    if (!confirmDelete) {
      return;
    }

    const { error: deleteError } = await supabase
      .from('events')
      .delete()
      .eq('id', eventId);

    if (deleteError) {
      console.error('Error deleting event:', deleteError);
      window.alert(deleteError.message);
      return;
    }

    if (checkAwardsData.length !== 0) {
      const { error: deleteError } = await supabase
        .from('awards')
        .delete()
        .eq('event_id', eventId);

      if (deleteError) {
        console.error('Error deleting technologies:', deleteError);
        return;
      }
    }

    router.push('/admin/events/existing-events');
  }

  const onSubmit: SubmitHandler<EventOutputSchema> = async (data) => {

    setIsLoading(true);

    let imageUrl = '';
    if (data.thumbnailImage instanceof File) {
      const imageFileName = encodeURIComponent(`${Date.now()}-${data.thumbnailImage.name.replace(/[^a-zA-Z0-9.]/g, '_')}`);
      if (checkImageDataURL) {
        const { error: uploadError } = await supabase.storage
          .from('event_images')
          .update(checkImageDataURL, data.thumbnailImage);

        if (uploadError) {
          console.error('Error uploading file: ', uploadError.message);
          window.alert(uploadError.message);
          setIsLoading(false);
          return;
        }
      } else {
        const { error: uploadError } = await supabase.storage
          .from('event_images')
          .upload(imageFileName, data.thumbnailImage);

        if (uploadError) {
          console.error('Error uploading file: ', uploadError.message);
          window.alert(uploadError.message);
          setIsLoading(false);
          return;
        }
      }

      const { data: publicImageUrlData } = await supabase.storage
        .from('event_images')
        .getPublicUrl(checkImageDataURL ? checkImageDataURL : imageFileName);

      imageUrl = `${publicImageUrlData.publicUrl}?t=${Date.now()}` || '';
    }

    const { thumbnailImage, awards, release_year, release_month, ...rest } = data;
    if (imageDataURL && imageUrl === '') {
      imageUrl = imageDataURL;
    }
    const submitData = { ...rest, image: imageUrl, year: release_year, month: release_month };

    const { error: insertError } = await supabase
      .from('events')
      .update(submitData)
      .eq('id', eventId)
      .select();

    if (insertError) {
      console.error('Error inserting event:', insertError);
      window.alert(insertError.message);
      setIsLoading(false);
      return;
    }
    if (checkAwardsData.length !== 0) {
      const { error: deleteError } = await supabase
        .from('awards')
        .delete()
        .eq('event_id', eventId);

      if (deleteError) {
        console.error('Error deleting technologies:', deleteError);
        return;
      }
    }
    if (data.awards?.length !== 0 && data.awards !== undefined) {
      const awardsToInsert = data.awards.map((award) => {
        if (award.name !== '' && award.order_num !== 0) {
          return {
            ...award,
            event_id: eventId,
          };
        }
      });

      const awardsToInsertFiltered = awardsToInsert.filter((award) => award !== undefined);


      if (awardsToInsertFiltered.length !== 0) {
        const { error: insertError } = await supabase
          .from('awards')
          .upsert(awardsToInsertFiltered)
          .select();

        if (insertError) {
          console.error('Error inserting award:', insertError);
          window.alert(insertError.message);
          setIsLoading(false);
          return;
        }
      }
    }

    router.push('/admin/events/existing-events');
  };

  return (
    <>
      <LoadingModal isOpen={isLoading} />
      <main style={{
        width: "90%",
        margin: "0 auto",
      }}>
        <AdminHeader isEditing />
        {!isFirstLoading && <div>
          <div style={{
            borderBottom: "1px solid #9CABC7",
            paddingBottom: "12px",
            marginBottom: "12px",
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <h1>既存イベント編集</h1>
            <FormButton name="データ削除" type='delete' onClick={handleDelete} />
          </div>
          <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
            {formFields.map(({ title, fields }, index) => (
              <section key={index} style={{
                borderBottom: "1px solid #9CABC7",
                paddingBottom: "12px",
                marginBottom: "12px",
              }}>
                <h3>{title}</h3>
                {fields.map((field) => (
                  <FormFactory<EventInputSchema> key={field.id} {...field} />
                ))}
              </section>
            ))}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '60px',
              margin: "20px 0"
            }}>
              <FormButton name="編集破棄" type='cancel' onClick={handleCancel} />
              <FormButton name="編集完了" type='submit' />
            </div>
          </form>
        </div>}
      </main>
    </>
  );
};

export default EditEventPage;

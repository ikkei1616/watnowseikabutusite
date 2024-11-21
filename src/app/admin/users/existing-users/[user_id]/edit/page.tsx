"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { ServiceInputSchema, ServiceOutputSchema, resolver } from "../../../new/userFormSchema";
import { teckData, FormField, useFormFields } from "../../../new/hooks";
import { FormFactory } from "@/components/form/FormFactory";
import FormButton from '@/components/form/FormButton';
import { supabase } from '@/supabase/supabase';
import AdminHeader from '@/components/admin/AdminHeader';
import LoadingModal from '@/components/loading/LoadingModal';

type userTableData = {
    name: string;
    nickname: string;
    account_id: string;
    introduction: string;
    image: File | undefined;
    imageURL: string;
}

type userTechsData = number;

type snsTableData = {
    id: string;
}

const EditServicesPage = ({
    params,
}: {
    params: { user_id: string };
}
) => {
    const { control, handleSubmit, reset } = useForm<ServiceInputSchema>({
        mode: "onChange",
        resolver: resolver,
        defaultValues: {
            iconImage: undefined,
            name: '',
            nickname: '',
            account_id: '',
            introduction: '',
            technologiesId: [],
            x_id: '',
            instagram_id: '',
            github_id: '',
        },
    });
    const userID = params.user_id;
    const [formFields, setFormFields] = useState<{ container: string, title: string, fields: FormField<ServiceInputSchema>[] }[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [imageDataURL, setImageDataURL] = useState<string | undefined>(undefined);
    const [checkImageDataURL, setCheckImageDataURL] = useState<string | undefined>(undefined);

    const [checkTecksData, setCheckTecksData] = useState<number[]>([]);
    const [checkXData, setCheckXData] = useState<string | undefined>(undefined);
    const [checkInstagramData, setCheckInstagramData] = useState<string | undefined>(undefined);
    const [checkGithubData, setCheckGithubData] = useState<string | undefined>(undefined);

    const router = useRouter();

    useEffect(() => {
        const fetchTecksData = async () => {
            try {
                const { data: getTechsData, error: techsError } = await supabase
                    .from('technologies')
                    .select('id, name');

                if (techsError) {
                    throw new Error(`Error fetching techs: ${techsError.message}`);
                }
                return getTechsData.map((tech) => ({ value: tech.id, label: tech.name })) || [];
            } catch (error) {
                console.error(error);
                return undefined;
            }
        };

        const fetchUserData = async () => {
            if (userID) {
                const { data: userData, error: userError } = await supabase
                    .from("users")
                    .select("*")
                    .eq("id", userID)
                    .single();
                if (userError) {
                    console.error("Error fetching awards data:", userError);
                    return undefined;
                }
                if (!userData) {
                    console.error("Error! data could not be found");
                    return undefined;
                }

                // let file = undefined;

                if (userData.image) {
                    //     const url = await fetch(userData.image);
                    //     const blob = await url.blob();
                    //     file = new File([blob], userData.image);
                    const splitURl = userData.image.split('/');
                    const fileName = splitURl[splitURl.length - 1];
                    setCheckImageDataURL(fileName);
                }
                return {
                    name: userData.name,
                    nickname: userData.nickname,
                    account_id: userData.account_id,
                    introduction: userData.introduction,
                    image: undefined,
                    imageURL: userData.image,
                };
            }
            return undefined;
        };

        const fetchUserTecksData = async () => {
            try {
                const { data: getUserTechsData, error: usertechsError } = await supabase
                    .from('users_technologies')
                    .select("technology_id")
                    .eq("user_id", userID)

                if (usertechsError) {
                    throw new Error(`Error fetching techs: ${usertechsError.message}`);
                }
                const userTechsData = getUserTechsData.map((tech) => tech.technology_id) || [];
                return userTechsData || [];
            } catch (error) {
                return [];
            }
        };
        const fetchUserXData = async () => {
            try {
                const { data: getUserXData, error: xError } = await supabase
                    .from('x')
                    .select("x_id")
                    .eq("user_id", userID)
                    .single();

                if (xError) {
                    throw new Error(`Error fetching techs: ${xError.message}`);
                }
                return { id: getUserXData.x_id };
            } catch (error) {
                return undefined;
            }
        };
        const fetchUserInstagramData = async () => {
            try {
                const { data: getUserInstagramData, error: instagramError } = await supabase
                    .from('instagram')
                    .select("instagram_id")
                    .eq("user_id", userID)
                    .single();

                if (instagramError) {
                    throw new Error(`Error fetching techs: ${instagramError.message}`);
                }
                return { id: getUserInstagramData.instagram_id };
            } catch (error) {
                return undefined;
            }
        };
        const fetchUserGithubData = async () => {
            try {
                const { data: getUserGithubData, error: githubError } = await supabase
                    .from('github')
                    .select("github_id")
                    .eq("user_id", userID)
                    .single();

                if (githubError) {
                    throw new Error(`Error fetching techs: ${githubError.message}`);
                }
                return { id: getUserGithubData.github_id };
            } catch (error) {
                return undefined;
            }
        };

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [tecksData, userTableData, userTechsData, userXData, userInstagramData, userGithubData]: [teckData[] | undefined, userTableData | undefined, userTechsData[] | [], snsTableData | undefined, snsTableData | undefined, snsTableData | undefined] = await Promise.all([fetchTecksData(), fetchUserData(), fetchUserTecksData(), fetchUserXData(), fetchUserInstagramData(), fetchUserGithubData()]);
                console.log(userTableData);
                reset({
                    iconImage: userTableData?.image,
                    name: userTableData?.name,
                    nickname: userTableData?.nickname,
                    account_id: userTableData?.account_id,
                    introduction: userTableData?.introduction === null ? "" : userTableData?.introduction,
                    technologiesId: userTechsData,
                    x_id: userXData?.id,
                    instagram_id: userInstagramData?.id,
                    github_id: userGithubData?.id,
                });
                setImageDataURL(userTableData?.imageURL);
                setCheckTecksData(userTechsData || []);
                setCheckXData(userXData?.id);
                setCheckInstagramData(userInstagramData?.id);
                setCheckGithubData(userGithubData?.id);
                setFormFields(useFormFields(control, tecksData, `${userTableData?.imageURL}?${new Date().getTime()}`));
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userID]);


    const handleCancel = () => {
        const confirmDelete = window.confirm("編集内容が破棄されますがよろしいですか？");

        if (!confirmDelete) {
            return;
        }
        router.push('/admin/users/existing-users');
    }

    const handleDelete = async () => {
        const confirmDelete = window.confirm("本当に削除しますか？");

        if (!confirmDelete) {
            return;
        }

        setIsLoading(true);
        const { error: deleteError } = await supabase
            .from('users')
            .delete()
            .eq('id', userID);

        if (deleteError) {
            console.error('Error deleting user:', deleteError);
            window.alert(deleteError.message);
            setIsLoading(false);
            return;
        }

        if (checkImageDataURL) {
            const { error: deleteImageError } = await supabase.storage
                .from('user_icons')
                .remove([checkImageDataURL]);

            if (deleteImageError) {
                console.error('Error deleting image:', deleteImageError);
                window.alert(deleteImageError.message);
                setIsLoading(false);
                return;
            }
        }

        if (checkTecksData.length > 0) {
            const { error: deleteTechsError } = await supabase
                .from('users_technologies')
                .delete()
                .eq('user_id', userID);

            if (deleteTechsError) {
                console.error('Error deleting technologies:', deleteTechsError);
                window.alert(deleteTechsError.message);
                setIsLoading(false);
                return;
            }
        }

        if (checkXData) {
            const { error: deleteXError } = await supabase
                .from('x')
                .delete()
                .eq('user_id', userID);

            if (deleteXError) {
                console.error('Error deleting x:', deleteXError);
                window.alert(deleteXError.message);
                setIsLoading(false);
                return;
            }
        }

        if (checkInstagramData) {
            const { error: deleteInstagramError } = await supabase
                .from('instagram')
                .delete()
                .eq('user_id', userID);

            if (deleteInstagramError) {
                console.error('Error deleting instagram:', deleteInstagramError);
                window.alert(deleteInstagramError.message);
                setIsLoading(false);
                return;
            }
        }

        if (checkGithubData) {
            const { error: deleteGithubError } = await supabase
                .from('github')
                .delete()
                .eq('user_id', userID);

            if (deleteGithubError) {
                console.error('Error deleting github:', deleteGithubError);
                window.alert(deleteGithubError.message);
                setIsLoading(false);
                return;
            }
        }

        router.push('/admin/users/existing-users');
    }

    const onSubmit: SubmitHandler<ServiceOutputSchema> = async (data) => {
        setIsLoading(true);
        let imageUrl = '';

        if (data.iconImage instanceof File) {
            const imageFileName = encodeURIComponent(`${Date.now()}-${data.iconImage.name.replace(/[^a-zA-Z0-9.]/g, '_')}`);
            if (checkImageDataURL) {
                const { error: uploadError } = await supabase.storage
                    .from('user_icons')
                    .update(checkImageDataURL, data.iconImage);

                if (uploadError) {
                    console.error('Error uploading file: ', uploadError.message);
                    window.alert(uploadError.message);
                    setIsLoading(false);
                    return;
                }
            } else {
                const { error: uploadError } = await supabase.storage
                    .from('user_icons')
                    .upload(imageFileName, data.iconImage);

                if (uploadError) {
                    console.error('Error uploading file: ', uploadError.message);
                    window.alert(uploadError.message);
                    setIsLoading(false);
                    return;
                }
            }

            const { data: publicImageUrlData } = await supabase.storage
                .from('user_icons')
                .getPublicUrl(checkImageDataURL ? checkImageDataURL : imageFileName);

            imageUrl = publicImageUrlData.publicUrl || '';
        }

        const { iconImage, technologiesId, x_id, instagram_id, github_id, ...rest } = data;
        if (imageDataURL && imageUrl === '') {
            imageUrl = imageDataURL;
        }
        const submitData = { ...rest, image: imageUrl };

        const { error: insertError } = await supabase
            .from('users')
            .update([submitData])
            .eq('id', userID);

        if (insertError) {
            console.error('Error inserting service:', insertError);
            window.alert(insertError.message);
            setIsLoading(false);
            return;
        }

        if (data.technologiesId && data.technologiesId.length > 0) {
            if (checkTecksData.length > 0) {
                const { error: deleteError } = await supabase
                    .from('users_technologies')
                    .delete()
                    .eq('user_id', userID);

                if (deleteError) {
                    console.error('Error deleting technologies:', deleteError);
                    return;
                }
                const { error: technologiesError } = await supabase
                    .from('users_technologies')
                    .insert(data.technologiesId.map((technologyId) => ({
                        user_id: userID,
                        technology_id: technologyId,
                    })));

                if (technologiesError) {
                    console.error('Error inserting technologies:', technologiesError);
                    window.alert(technologiesError.message);
                    setIsLoading(false);
                    return;
                }
            } else {
                const { error: technologiesError } = await supabase
                    .from('users_technologies')
                    .insert(data.technologiesId.map((technologyId) => ({
                        user_id: userID,
                        technology_id: technologyId,
                    })));

                if (technologiesError) {
                    console.error('Error inserting technologies:', technologiesError);
                    window.alert(technologiesError.message);
                    setIsLoading(false);
                    return;
                }
            }
        }

        if (checkXData) {
            if (x_id === "") {
                const { error: xIdError } = await supabase
                    .from('x')
                    .delete()
                    .eq('user_id', userID);

                if (xIdError) {
                    console.error('Error inserting url_web:', xIdError);
                    window.alert(xIdError.message);
                    setIsLoading(false);
                    return;
                }
            } else {
                const { error: xIdError } = await supabase
                    .from('x')
                    .update([{ x_id: x_id }])
                    .eq('user_id', userID);

                if (xIdError) {
                    console.error('Error inserting url_web:', xIdError);
                    window.alert(xIdError.message);
                    setIsLoading(false);
                    return;
                }
            }
        } else if (x_id) {
            const { error: xIdError } = await supabase
                .from('x')
                .insert([{ user_id: userID, x_id: x_id }]);

            if (xIdError) {
                console.error('Error inserting url_web:', xIdError);
                window.alert(xIdError.message);
                setIsLoading(false);
                return;
            }
        }


        if (checkInstagramData) {
            if (instagram_id === "") {
                const { error: instagramIdError } = await supabase
                    .from('instagram')
                    .delete()
                    .eq('user_id', userID);

                if (instagramIdError) {
                    console.error('Error inserting url_web:', instagramIdError);
                    window.alert(instagramIdError.message);
                    setIsLoading(false);
                    return;
                }
            } else {
                const { error: instagramIdError } = await supabase
                    .from('instagram')
                    .update({ instagram_id: instagram_id })
                    .eq('user_id', userID);

                if (instagramIdError) {
                    console.error('Error inserting url_web:', instagramIdError);
                    window.alert(instagramIdError.message);
                    setIsLoading(false);
                    return;
                }
            }
        } else if (instagram_id) {
            const { error: instagramIdError } = await supabase
                .from('instagram')
                .insert([{ user_id: userID, instagram_id: instagram_id }]);

            if (instagramIdError) {
                console.error('Error inserting url_web:', instagramIdError);
                window.alert(instagramIdError.message);
                setIsLoading(false);
                return;
            }
        }

        if (checkGithubData) {
            if (github_id === "") {
                const { error: githubIdError } = await supabase
                    .from('github')
                    .delete()
                    .eq('user_id', userID);

                if (githubIdError) {
                    console.error('Error inserting url_web:', githubIdError);
                    window.alert(githubIdError.message);
                    setIsLoading(false);
                    return;
                }
            } else {
                const { error: githubIdError } = await supabase
                    .from('github')
                    .update([{ user_id: userID, github_id: github_id }])
                    .eq('user_id', userID);

                if (githubIdError) {
                    console.error('Error inserting url_web:', githubIdError);
                    window.alert(githubIdError.message);
                    setIsLoading(false);
                    return;
                }
            }
        } else if (github_id) {
            const { error: githubIdError } = await supabase
                .from('github')
                .insert([{ user_id: userID, github_id: github_id }]);

            if (githubIdError) {
                console.error('Error inserting url_web:', githubIdError);
                window.alert(githubIdError.message);
                setIsLoading(false);
                return;
            }
        }

        router.push('/admin/users/existing-users');
    };

    return (
        <>
            <LoadingModal isOpen={isLoading} />
            <main style={{
                width: "90%",
                margin: "0 auto",
            }
            }>
                <AdminHeader isEditing />
                <div style={{
                    borderBottom: "1px solid #9CABC7",
                    paddingBottom: "12px",
                    marginBottom: "12px",
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <h1>既存ユーザ編集</h1>
                    <FormButton name="データ削除" type='delete' onClick={handleDelete} />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {formFields.map(({ title, fields }, index) => (
                        <section key={index} style={{
                            borderBottom: "1px solid #9CABC7",
                            paddingBottom: "12px",
                            marginBottom: "12px",
                        }}>
                            <h3>{title}</h3>
                            {fields.map((field) => (
                                <FormFactory<ServiceInputSchema> key={field.id} {...field} />
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
            </main>
        </>
    );
};

export default EditServicesPage;

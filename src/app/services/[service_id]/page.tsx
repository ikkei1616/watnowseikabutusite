export default function ServiceDetailPage({
    params,
}: {
    params: { service_id: string };
}) {
    console.log(params);
    const serviceID = params.service_id;
    return <h1>サービスID:{serviceID}</h1>;
};

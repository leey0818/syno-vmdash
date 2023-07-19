export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const synoHost = getHeader(event, 'X-Syno-Host');

  if (!body?.type || !synoHost) {
    setResponseStatus(event, 400);
    return send(event);
  }

  const params = { ...body };
  delete params.type;

  try {
    const apiUrl = `/webapi/${body.type}.cgi`;
    console.log(` -> ${apiUrl}?${new URLSearchParams(params).toString()}`);

    const response = await $fetch(apiUrl, {
      baseURL: synoHost,
      method: 'GET',
      responseType: 'json',
      params,
    });

    console.log(` <- ${JSON.stringify(response)}`);
    return response;
  } catch (e) {
    if (e instanceof Error) {
      return sendError(event, e);
    } else {
      return sendError(event, new Error(e as any));
    }
  }
});

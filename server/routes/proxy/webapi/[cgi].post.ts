export default defineEventHandler(async (event) => {
  const cgiName = event.context.params?.cgi;
  if (!cgiName || !cgiName.endsWith('.cgi')) {
    throw createError({ statusCode: 400 });
  }

  const params = await readBody(event);
  const synoHost = getHeader(event, 'X-Syno-Host');
  if (!synoHost || !/^http(s)?:\/\//.test(synoHost)) {
    throw createError({ statusCode: 400 });
  }

  try {
    const apiUrl = `/webapi/${cgiName}`;
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
    console.log(` <- ${e}`);
    throw createError({
      statusCode: 502,
      statusMessage: 'Proxy error',
      cause: e,
    });
  }
});

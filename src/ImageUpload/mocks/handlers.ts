import { rest } from 'msw';

const UPLOAD_ROUTE = 'https://api.cloudinary.com/v1_1/:cloudName/image/upload';

export const upload201 = rest.post(UPLOAD_ROUTE, (req, res, ctx) => {
  return res(
    ctx.status(201),
    ctx.json({
      public_id: `public-id-${new Date().toString()}`,
      secure_url: `http://domain/${new Date().toUTCString()}`,
    })
  );
});

export const upload400 = rest.post(UPLOAD_ROUTE, (req, res, ctx) =>
  res(ctx.status(400), ctx.json({ message: 'Client Error' }))
);

export const upload500 = rest.post(UPLOAD_ROUTE, (req, res, ctx) =>
  res(ctx.status(500), ctx.json({ message: 'Internal Server Error' }))
);

export const handlers = [upload201];

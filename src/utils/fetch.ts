export const fetchHandler = async (reqData: { [x: string]: any }) => {
  return await fetch(
    'https://us-central1-blinkapp-684c1.cloudfunctions.net/fakeAuth',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqData),
    }
  )
    .then(async (res: Response) => {
      return { ok: res.ok, status: res.status, body: res }
    })
    .then(async (res: any) => {
      if (!res.ok) {
        await res.body.json().then((result: any) => {
          const errMsg = result.errorMessage
          throw new Error(errMsg ?? 'Something went wrong')
        })
      }
      return res
    })
}

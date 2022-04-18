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
}

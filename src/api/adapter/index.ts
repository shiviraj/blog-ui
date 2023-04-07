import axios from 'axios'

const initHeaders = () => {
  // const { token, user = {} } = getStorage(StorageKeys.AUTH) || {}
  // const { token: dummyToken = '', user: dummyUser = {} } = getStorage(StorageKeys.DUMMY) || {}
  return {
    'Content-Type': 'application/json'
    // authorization: `Bearer ${token ?? dummyToken}`,
    // 'x-reference-id': user.userId ?? dummyUser.userId ?? 'missing-reference-id'
  }
}

const fetch = <ResultType extends Record<string, unknown> | Array<Record<string, unknown>>>(
  url: string,
  data?: Record<string, unknown>,
  options?: Record<string, unknown>,
  // retry = Integer.ONE
): Promise<ResultType> => {
  return new Promise((resolve, reject) => {
    axios({url, ...options, headers: initHeaders(), data})
      .then(({data}: { data: ResultType }) => {
        resolve(data)
      })
      .catch((error: Error) => {
        // if (retry.isGreaterThanZero() && !url.includes('/api/users/validate')) {
        //   this.fetch(url, data, options, retry.add(Integer.NEGATIVE_ONE)).then((data: ResultType) => {
        //     resolve(data)
        //   })
        // } else {
        reject(error)
        // }
      })
  })
}

export default fetch

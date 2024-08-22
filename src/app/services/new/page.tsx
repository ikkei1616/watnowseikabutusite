import React from 'react'

const newServicesPage = () => {
  return (
    <>
    <main>
        <h1>新規サービス作成</h1>
        <form>
            <div>
            <label htmlFor="serviceName">サービス名</label>
            <input type="text" id="serviceName"/>
            </div>
            <div>
            <label htmlFor="description">サービス情報</label>
            <textarea id="description" />
            </div>
            <div>
            <label htmlFor="teamName">チーム名</label>
            <input type="text" id="teamName" />
            </div>
            <div>
            <label htmlFor="serviseImage">画像</label>
            <input type="file" id="serviseImage" />
            </div>
            <div>
            <label htmlFor="award">賞</label>
            <input type="number" id="award" />
            </div>
            <div>
            <label htmlFor="selectEvent">イベント</label>
            <input type="text" id="selectEvent" />
            </div>
            <div>
            <label htmlFor="serviseDetail">サービス詳細情報</label>
            <textarea id="serviseDetail" />
            </div>
            <div>
            <label htmlFor="developmentPeriodNum">開発期間</label>
            <input type="number" id="developmentPeriodNum" />
            <p>month</p>
            </div>

            <button type="submit">完了</button>
        </form>
    </main>
    </>
  )
}

export default newServicesPage
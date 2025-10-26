from flask import Flask, request, jsonify
from datetime import datetime, timedelta

app = Flask(__name__)

@app.get('/health')
def health():
    return jsonify(ok=True)

@app.post('/forecast')
def forecast():
    payload = request.get_json(force=True) or {}
    horizon = int(payload.get('horizonDays', 90))
    start = datetime.utcnow().date()
    series = []
    for i in range(horizon):
        d = start + timedelta(days=i+1)
        series.append({
            "date": d.isoformat(),
            "predictedRecruitment": i + 10,
            "predictedCost": (i + 10) * 1000
        })
    return jsonify({
        "results": {"series": series, "summary": {"totalCost": sum(x["predictedCost"] for x in series)}},
        "metrics": {"mae": 0, "rmse": 0}
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)

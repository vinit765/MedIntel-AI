from uuid import uuid4

from fastapi.testclient import TestClient

from app.main import app


def test_register_login_and_me_flow() -> None:
    with TestClient(app) as client:
        email = f"user-{uuid4()}@example.com"

        register_response = client.post(
            "/api/v1/register",
            json={"email": email, "full_name": "Clinical User", "password": "secure-pass-123"},
        )
        assert register_response.status_code == 201
        assert register_response.json()["email"] == email

        login_response = client.post(
            "/api/v1/login",
            json={"email": email, "password": "secure-pass-123"},
        )
        assert login_response.status_code == 200
        token = login_response.json()["access_token"]

        me_response = client.get("/api/v1/me", headers={"Authorization": f"Bearer {token}"})
        assert me_response.status_code == 200
        assert me_response.json()["email"] == email

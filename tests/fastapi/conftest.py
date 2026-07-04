import pytest
from httpx import AsyncClient
from app.main import app
from app.auth import get_current_user

@pytest.fixture
def override_auth():
    def mock_get_current_user():
        return {"userId": "test-user-id"}
    app.dependency_overrides[get_current_user] = mock_get_current_user
    yield
    app.dependency_overrides = {}

@pytest.fixture
async def async_client():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac

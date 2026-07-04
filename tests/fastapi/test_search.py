import pytest

@pytest.mark.asyncio
async def test_search_structure(async_client, override_auth):
    payload = {"query": "test query", "top_k": 1}
    response = await async_client.post("/api/v1/search", json=payload)
    # Even if DB is empty, should return 200 with empty results
    assert response.status_code == 200
    data = response.json()
    assert "results" in data
    assert "query" in data

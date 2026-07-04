import pytest

@pytest.mark.asyncio
async def test_upload_non_pdf(async_client, override_auth):
    # Dummy file that is not a PDF
    files = {"file": ("test.txt", b"This is a test file", "text/plain")}
    response = await async_client.post("/api/v1/documents/upload", files=files)
    # Depending on implementation, might return 400
    assert response.status_code in [400, 422, 500]

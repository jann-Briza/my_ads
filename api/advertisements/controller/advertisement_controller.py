from typing import Any, Dict, List, Optional, Tuple

from advertisements.domain import advertisements_domain
from dto import AdvertisementRequest


def get(id: int) -> str:
    return advertisements_domain.get_by_id(id)


def fetch_all(
    limit: Optional[int], offset: Optional[int], category_id: Optional[int]
) -> Tuple[List[str], int]:
    size = int(advertisements_domain.get_count())
    data = advertisements_domain.fetch_all(limit, offset, category_id)
    return data, size


def create(advertisement: AdvertisementRequest) -> None:
    advertisements_domain.create(advertisement)


def update(advertisement: AdvertisementRequest, id: int) -> None:
    advertisements_domain.update(advertisement, id)


def delete(id: int) -> None:
    advertisements_domain.delete(id)

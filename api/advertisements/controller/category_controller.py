from typing import Iterator

from advertisements.domain import category_domain
from dto import Category


def fetch_all() -> Iterator[Category]:
    return category_domain.fetch_all()

__author__ = 'deadblue'

from dataclasses import dataclass
from typing import List


@dataclass
class Handler:
    name: str
    code: str
    domains: List[str]


@dataclass
class Source:
    dir_path: str
    handlers: List[Handler]

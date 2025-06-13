__author__ = 'deadblue'

from contextlib import AbstractContextManager
from types import TracebackType
from typing import Any, Dict, Self, TextIO

from jinja2 import Environment, FileSystemLoader

from .types import Source


class Composer(AbstractContextManager):

    _fp: TextIO

    def __init__(self, dist_path: str) -> None:
        self._fp = open(dist_path, 'w')
    
    def __enter__(self) -> Self:
        return self

    def __exit__(
            self, 
            exc_type: type[BaseException] | None, 
            exc_value: BaseException | None, 
            traceback: TracebackType | None
        ) -> bool | None:
        self._fp.close()

    def _prepare_context(self, source: Source) -> Dict[str, Any]:
        domain_set = set[str]()
        for h in source.handlers:
            domain_set.update(h.domains)
        return {
            'domains': sorted(domain_set),
            'handlers': source.handlers
        }

    def compose(self, source: Source):
        env = Environment(
            loader=FileSystemLoader(searchpath=source.dir_path),
            trim_blocks=True,
            lstrip_blocks=True,
        )
        tmpl = env.get_template('userscript.js.j2')
        self._fp.write(tmpl.render(self._prepare_context(source)))
        self._fp.flush()
